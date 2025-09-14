import json
import sys
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import math
from google import genai
from google.genai import types
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
load_dotenv()

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Data Models ----
class Submission(BaseModel):
    id: int
    tiv: float
    created_at: str
    loss_value: float
    winnability: float
    account_name: str
    total_premium: float
    effective_date: str
    expiration_date: str
    oldest_building: int
    line_of_business: str
    construction_type: str
    primary_risk_state: str
    renewal_or_new_business: str

class SubmissionList(BaseModel):
    data: List[Submission]

class Settings(BaseModel):
    submissionType: dict
    lineOfBusiness: dict
    primaryRiskState: dict
    tivLimits: dict
    totalPremium: dict
    buildingAge: dict
    constructionType: dict
    lossValue: dict


# stored_settings = {
#   "submissionType": {
#     "newBusiness": True,
#     "renewalBusiness": False
#   },
#   "lineOfBusiness": {
#     "property": True,
#     "other": False
#   },
#   "primaryRiskState": {
#     "acceptable": ["NC", "SC", "GA", "VA", "UT"],
#     "target": ["OH", "PA", "MD", "CO", "CA"]
#   },
#   "tivLimits": {
#     "acceptableMin": 100,
#     "acceptableMax": 150,
#     "targetMin": 0,
#     "targetMax": 100
#   },
#   "totalPremium": {
#     "acceptableMin": 50,
#     "acceptableMax": 175,
#     "targetMin": 75,
#     "targetMax": 100
#   },
#   "buildingAge": {
#     "acceptableNewerThan": 1990,
#     "targetNewerThan": 2010
#   },
#   "constructionType": {
#     "acceptable": ["Masonry Non-Combustible", "Joisted Masonry", "Non-Combustible"]
#   },
#   "lossValue": {
#     "lessThan": 100
#   }
# }
# ---- Scoring Helper Functions ----
def normalize(value, min_val, max_val):
    """Normalize between 0 and 1."""
    if max_val == min_val:
        return 0.0
    return (value - min_val) / (max_val - min_val)
def get_stored_settings():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    SETTINGS_FILE = os.path.join(base_dir, "settings.json")
    if not os.path.exists(SETTINGS_FILE):
        raise FileNotFoundError(f"{SETTINGS_FILE} not found.")
    with open(SETTINGS_FILE, "r") as f:
        settings = json.load(f)
    # If settings.json is a list, take the first item (matches your frontend)
    return settings

def apetite_calculation(s: Submission) -> int:
    settings = get_stored_settings()
    score = 0  # apetite score out of 12 (or more if rules expand)

    # New vs Renewal business
    if s["renewal_or_new_business"] == "NEW_BUSINESS" and settings["submissionType"]["newBusiness"]:
        score += 1
    elif s["renewal_or_new_business"] == "RENEWAL" and settings["submissionType"]["renewalBusiness"]:
        score += 1

    # TIV limits
    tiv_limits = settings["tivLimits"]
    if tiv_limits["targetMin"] <= s["tiv"] <= tiv_limits["targetMax"]:
        score += 2
    elif tiv_limits["acceptableMin"] <= s["tiv"] <= tiv_limits["acceptableMax"]:
        score += 1

    # Line of business
    lob = settings["lineOfBusiness"]
    if s["line_of_business"] == "COMMERCIAL_PROPERTY" and lob["property"]:
        score += 1
    elif lob["other"]:
        score += 1

    # Loss value
    if float(s["loss_value"]) <= settings["lossValue"]["lessThan"]:
        score += 1

    # Total premium
    premium_limits = settings["totalPremium"]
    if premium_limits["targetMin"] <= s["total_premium"] <= premium_limits["targetMax"]:
        score += 2
    elif premium_limits["acceptableMin"] <= s["total_premium"] <= premium_limits["acceptableMax"]:
        score += 1

    # Primary risk state
    if s["primary_risk_state"] in settings["primaryRiskState"]["target"]:
        score += 2
    elif s["primary_risk_state"] in settings["primaryRiskState"]["acceptable"]:
        score += 1

    # Building age
    if s["oldest_building"] >= settings["buildingAge"]["targetNewerThan"]:
        score += 2
    elif s["oldest_building"] >= settings["buildingAge"]["acceptableNewerThan"]:
        score += 1

    # Construction type
    if s["construction_type"] in settings["constructionType"]["acceptable"]:
        score += 1

    return score

def compute_priority_scores(submissions: List[Submission]):
    today = datetime.now(timezone.utc)
    
    if not submissions:
        print("File not found")
        return {}

    # Pre-calc ranges for normalization
    premiums = [s["total_premium"] for s in submissions]
    losses = [s["loss_value"] for s in submissions]
    loss_ratios = [(float(s["loss_value"]) / s["total_premium"]) if s["total_premium"] > 0 else 1.0 for s in submissions]

    min_premium, max_premium = min(premiums), max(premiums)
    min_loss_ratio, max_loss_ratio = min(loss_ratios), max(loss_ratios)

    ranked = []
    for s in submissions:
        # Profitability (higher premium, lower losses better)
        loss_ratio = float(s["loss_value"]) / s["total_premium"] if s["total_premium"] > 0 else 1.0
        profit_score = 1 - normalize(loss_ratio, min_loss_ratio, max_loss_ratio)

        # Winnability already 0-1
        win_score = s["winnability"]

        # Urgency: days until expiration (closer = higher urgency)
        exp_date = datetime.fromisoformat(s["expiration_date"].replace("Z", "+00:00"))
        days_to_exp = (exp_date - today).days
        urgency_score = math.exp(-days_to_exp/30) if days_to_exp > 0 else 1.0  # decays over time

        appetite_score = apetite_calculation(s) / 12  # normalize to 0-1

        # Weighted score
        score = (
            0.2 * profit_score +
            0.5 * appetite_score +
            0.1 * win_score +
            0.2 * urgency_score
        )

        score = round(score, 2) 

        ranked.append({
            "id": s["id"],
            "account_name": s["account_name"],
            "priority_score": score * 100,  
            "details": {
                "profit_score": round(profit_score, 3),
                "appetite_score": round(appetite_score, 3),
                "win_score": win_score,
                "urgency_score": round(urgency_score, 3)
            }
        })

    # Sort by score, descending
    ranked.sort(key=lambda x: x["priority_score"], reverse=True)
    return ranked


@app.get("/get_priority_scores")
def get_priority_scores():
    submissions = json.load(open("testsubmissions.json"))["data"]
    return compute_priority_scores(submissions)

def generate_summaries(top_submissions):
    """Generate AI summaries for the top 3 submissions."""
    summaries = []
    for rank, s in enumerate(top_submissions, start=1):
        prompt = f"""
        You are an assistant for insurance underwriters.
        Analyze this account and explain why it ranked in the top 3 for priority:

        Account Name: {s['account_name']}
        Priority Score: {s['priority_score']}
        Profit Score: {s['details']['profit_score']}
        Appetite Score: {s['details']['appetite_score']}
        Winnability: {s['details']['win_score']}
        Urgency Score: {s['details']['urgency_score']}

        Write a short report (3-5 sentences) highlighting:
        - Why this account is attractive
        - What makes it low risk
        - Why it deserves to be highlighted to an underwriter
        """
        response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
        summaries.append({
            "rank": rank,
            "account_name": s["account_name"],
            "summary": response.text.strip()
        })
    return summaries

# with open('../test_submissions.json', "r") as f:
#     data = json.load(f)

#     # Create Pydantic model objects
#     submissions = [Submission(**s) for s in data["data"]]

@app.post("/priority_scores")
async def get_priority_scores():
    try:
        # Load test submissions JSON data
        test_submissions_file = os.path.join(base_dir, "testsubmissions.json")
        
        if not os.path.exists(test_submissions_file):
            return JSONResponse(content={"error": "testsubmissions.json not found."}, status_code=404)

        with open(test_submissions_file, "r") as f:
            data = json.load(f)

        # Create Pydantic model objects
        submissions = [Submission(**s) for s in data["data"]]

        # Compute priority scores
        ranked = compute_priority_scores(submissions)
        top3 = ranked[:3]
        summaries = generate_summaries(top3)

        # Return ranked submissions and summaries
        return JSONResponse(content={"ranked_submissions": ranked, "top_3_summaries": summaries})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


base_dir = os.path.dirname(os.path.abspath(__file__))
SETTINGS_FILE = os.path.join(base_dir, "settings.json")
@app.post("/save_settings")
async def save_settings(settings: Settings):
    try:
        with open(SETTINGS_FILE, "w") as f:
            json.dump(settings.dict(), f, indent=2)
        return JSONResponse(content={"message": "Settings saved successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@app.get("/save_settings")
async def get_settings():
    if not os.path.exists(SETTINGS_FILE):
        return JSONResponse(content=[])
    with open(SETTINGS_FILE, "r") as f:
        return JSONResponse(content=json.load(f))

@app.post("/widget")
async def post_widget(settings: Settings):
    try:
        with open(SETTINGS_FILE, "w") as f:
            json.dump(settings.dict(), f, indent=2)
        return JSONResponse(content={"message": "Settings saved successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@app.get("/widget")
async def get_widget():
    if not os.path.exists(SETTINGS_FILE):
        return JSONResponse(content=[])
    with open(SETTINGS_FILE, "r") as f:
        return JSONResponse(content=json.load(f))

LAYOUT_FILE = "layout.json"

@app.get("/layout")
async def get_layout():
    if not os.path.exists(LAYOUT_FILE):
        return JSONResponse(content=[])
    with open(LAYOUT_FILE, "r") as f:
        return JSONResponse(content=json.load(f))

@app.post("/layout")
async def save_layout(request: Request):
    try:
        new_layout = await request.json()   # expects a list of items
        with open(LAYOUT_FILE, "w") as f:
            json.dump(new_layout, f, indent=2)
        return JSONResponse(content={"message": "Layout saved successfully"})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Add an endpoint to serve the testsubmissions.json file
@app.get("/testsubmissions.json")
async def serve_test_submissions():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        test_submissions_file = os.path.join(base_dir, "..", "client", "public", "testsubmissions.json")
        if not os.path.exists(test_submissions_file):
            return JSONResponse(content={"error": "testsubmissions.json not found."}, status_code=404)

        with open(test_submissions_file, "r") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main.py submissions.json")
        sys.exit(1)

    file_path = sys.argv[1]
    try:
        with open(file_path, "r") as f:
            data = json.load(f)

        # Create Pydantic model objects
        submissions = [Submission(**s) for s in data["data"]]

        ranked = compute_priority_scores(submissions)
        top3 = ranked[:3]
        summaries = generate_summaries(top3)

        print(json.dumps({
            "ranked_submissions": ranked,
            "top_3_summaries": summaries
        }, indent=2))

    except Exception as e:
        print(f"Error: {e}")
