import json
import sys
import math
import os
from datetime import datetime, timezone
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator


app = FastAPI()

# Allow requests from your frontend
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all
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


# ---- Helper Functions ----
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
    return settings


def apetite_calculation(s: Submission) -> int:
    settings = get_stored_settings()
    score = 0

    # New vs Renewal business
    if s.renewal_or_new_business == "NEW_BUSINESS" and settings["submissionType"]["newBusiness"]:
        score += 1
    elif s.renewal_or_new_business == "RENEWAL" and settings["submissionType"]["renewalBusiness"]:
        score += 1

    # TIV limits
    tiv_limits = settings["tivLimits"]
    if tiv_limits["targetMin"] <= s.tiv <= tiv_limits["targetMax"]:
        score += 2
    elif tiv_limits["acceptableMin"] <= s.tiv <= tiv_limits["acceptableMax"]:
        score += 1

    # Line of business
    lob = settings["lineOfBusiness"]
    if s.line_of_business == "COMMERCIAL_PROPERTY" and lob["property"]:
        score += 1
    elif lob["other"]:
        score += 1

    # Loss value
    if s.loss_value <= settings["lossValue"]["lessThan"]:
        score += 1

    # Total premium
    premium_limits = settings["totalPremium"]
    if premium_limits["targetMin"] <= s.total_premium <= premium_limits["targetMax"]:
        score += 2
    elif premium_limits["acceptableMin"] <= s.total_premium <= premium_limits["acceptableMax"]:
        score += 1

    # Primary risk state
    if s.primary_risk_state in settings["primaryRiskState"]["target"]:
        score += 2
    elif s.primary_risk_state in settings["primaryRiskState"]["acceptable"]:
        score += 1

    # Building age
    if s.oldest_building >= settings["buildingAge"]["targetNewerThan"]:
        score += 2
    elif s.oldest_building >= settings["buildingAge"]["acceptableNewerThan"]:
        score += 1

    # Construction type
    if s.construction_type in settings["constructionType"]["acceptable"]:
        score += 1

    return score


# --- Corrected Helper Function ---
def compute_priority_scores(submissions: List[Submission]):
    if not submissions:
        return []

    today = datetime.now(timezone.utc)
    premiums = [s.total_premium for s in submissions]
    loss_ratios = [(s.loss_value / s.total_premium) if s.total_premium > 0 else 1.0 for s in submissions]

    # Handle the edge case of empty loss_ratios list
    if not loss_ratios:
        return []

    min_loss_ratio, max_loss_ratio = min(loss_ratios), max(loss_ratios)
    ranked = []

    # Rest of the function remains the same
    for s in submissions:
        loss_ratio = s.loss_value / s.total_premium if s.total_premium > 0 else 1.0
        profit_score = 1 - normalize(loss_ratio, min_loss_ratio, max_loss_ratio)
        win_score = s.winnability
        # ... (rest of score calculations)
        exp_date = datetime.fromisoformat(s.expiration_date.replace("Z", "+00:00").replace(".000", ""))
        days_to_exp = (exp_date - today).days
        urgency_score = math.exp(-days_to_exp / 30) if days_to_exp > 0 else 1.0
        appetite_score = apetite_calculation(s) / 12
        score = (
                0.2 * profit_score +
                0.5 * appetite_score +
                0.1 * win_score +
                0.2 * urgency_score
        )
        ranked.append({
            "id": s.id,
            "account_name": s.account_name,
            "priority_score": round(score * 100, 2),
            "details": {
                "profit_score": round(profit_score, 3),
                "appetite_score": round(appetite_score, 3),
                "win_score": round(win_score, 3),
                "urgency_score": round(urgency_score, 3)
            }
        })

    ranked.sort(key=lambda x: x["priority_score"], reverse=True)
    return ranked


def generate_summaries(top_submissions):
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
        """
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )
        summaries.append({
            "rank": rank,
            "account_name": s["account_name"],
            "summary": response.text.strip()
        })
    return summaries


# ---- API Endpoints ----
@app.post("/priority_scores")
async def get_priority_scores(submission_list: SubmissionList):
    try:
        submissions = submission_list.data
        ranked = compute_priority_scores(submissions)
        top3 = ranked[:3]
        summaries = generate_summaries(top3)
        return {"ranked_submissions": ranked, "top_3_summaries": summaries}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


SETTINGS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "settings.json")

@app.post("/save_settings")
async def save_settings(settings: Settings):
    try:
        with open(SETTINGS_FILE, "w") as f:
            json.dump(settings.dict(), f, indent=2)
        return {"message": "Settings saved successfully"}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/save_settings")
async def get_settings():
    if not os.path.exists(SETTINGS_FILE):
        return []
    with open(SETTINGS_FILE, "r") as f:
        return json.load(f)


# --- Corrected API Endpoint ---
# --- Corrected API Endpoint to robustly handle parsing ---

@app.get("/results")
async def get_results():
    file_path = os.path.join(os.path.dirname(__file__), "testsubmissions.json")
    if not os.path.exists(file_path):
        return {"error": "testsubmissions.json not found"}

    try:
        with open(file_path, "r") as f:
            data = json.load(f)

        submissions = []
        parsing_errors = []

        # This loop now handles parsing one submission at a time
        for s in data["data"]:
            try:
                # Attempt to create a Submission object
                valid_submission = Submission(**s)
                submissions.append(valid_submission)
            except Exception as e:
                # If validation fails, print the error and skip the submission
                error_message = f"Validation Error for submission with ID {s.get('id', 'N/A')}: {e}"
                parsing_errors.append(error_message)
                print(error_message)  # This will show you exactly what's wrong

        if not submissions:
            # If no submissions could be parsed, return a helpful message
            return {"ranked": [], "parsing_errors": parsing_errors}

        ranked = compute_priority_scores(submissions)

        return {
            "ranked": ranked,
            "parsing_errors": parsing_errors
        }

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
