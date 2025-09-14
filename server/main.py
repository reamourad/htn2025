import json
import sys
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import math
from google import genai
from google.genai import types
import os

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

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


# ---- Scoring Helper Functions ----
def normalize(value, min_val, max_val):
    """Normalize between 0 and 1."""
    if max_val == min_val:
        return 0.0
    return (value - min_val) / (max_val - min_val)

def apetite_calculation(s: Submission) -> int:
    score = 0 # apetite score out of 12 for each underwriter guideline category
    if s.renewal_or_new_business == "NEW_BUSINESS":
        score += 1

    if s.tiv <= 100000000:
        score += 2
    elif 100000000 < s.tiv < 150000000:
        score += 1

    if s.line_of_business in ["COMMERCIAL_PROPERTY"]:
        score += 1
    
    if s.loss_value <= 100000:
        score += 1
    
    if 75000 <= s.total_premium >= 100000:
        score += 2
    elif 50000 <= s.total_premium < 75000 or 100000 < s.total_premium <= 175000:
        score += 1
    
    if s.primary_risk_state in ["OH", "PA", "MD", "CO", "CA"]:
        score += 2
    elif s.primary_risk_state in ["NC", "SC", "GA", "VA", "UT"]:
        score += 1
    
    if s.oldest_building >= 2010:
        score += 2
    elif 1990 <= s.oldest_building < 2010:
        score += 1
    
    if s.construction_type in ["Masonry Non-Combustible", "Joisted Masonry", "Non-Combustible"]:
        score += 1
    return score

def compute_priority_scores(submissions: List[Submission]):
    today = datetime.now(timezone.utc)
    
    # Pre-calc ranges for normalization
    premiums = [s.total_premium for s in submissions]
    losses = [s.loss_value for s in submissions]
    loss_ratios = [(s.loss_value / s.total_premium) if s.total_premium > 0 else 1.0 for s in submissions]

    min_premium, max_premium = min(premiums), max(premiums)
    min_loss_ratio, max_loss_ratio = min(loss_ratios), max(loss_ratios)

    ranked = []
    for s in submissions:
        # Profitability (higher premium, lower losses better)
        loss_ratio = s.loss_value / s.total_premium if s.total_premium > 0 else 1.0
        profit_score = 1 - normalize(loss_ratio, min_loss_ratio, max_loss_ratio)

        # Winnability already 0-1
        win_score = s.winnability

        # Urgency: days until expiration (closer = higher urgency)
        exp_date = datetime.fromisoformat(s.expiration_date.replace("Z", "+00:00"))
        days_to_exp = (exp_date - today).days
        urgency_score = math.exp(-days_to_exp/30) if days_to_exp > 0 else 1.0  # decays over time

        appetite_score = apetite_calculation(s) / 12  # normalize to 0-1

        # Weighted score
        score = (
            0.4 * profit_score +
            0.3 * appetite_score +
            0.2 * win_score +
            0.1 * urgency_score
        )

        score = round(score, 2) 

        ranked.append({
            "id": s.id,
            "account_name": s.account_name,
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

# ---- API Routes ----
@app.post("/rank_submissions")
def rank_submissions(payload: SubmissionList):
    ranked = compute_priority_scores(payload.data)
    top3 = ranked[:3]
    summaries = generate_summaries(top3)
    return {
        "ranked_submissions": ranked,
        "top_3_summaries": summaries
    }

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
