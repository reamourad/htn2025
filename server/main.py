from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import math

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

def compute_priority_scores(submissions: List[Submission]):
    today = datetime.utcnow()
    
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

        # Appetite placeholder: in real use, call Gemini here
        appetite_score = 0.8 if s.primary_risk_state == "CA" else 0.5

        # Weighted score
        score = (
            0.4 * profit_score +
            0.3 * appetite_score +
            0.2 * win_score +
            0.1 * urgency_score
        )

        ranked.append({
            "id": s.id,
            "account_name": s.account_name,
            "priority_score": round(score, 3),
            "details": {
                "profit_score": round(profit_score, 3),
                "appetite_score": appetite_score,
                "win_score": win_score,
                "urgency_score": round(urgency_score, 3)
            }
        })

    # Sort by score, descending
    ranked.sort(key=lambda x: x["priority_score"], reverse=True)
    return ranked


# ---- API Routes ----
@app.post("/rank_submissions")
def rank_submissions(payload: SubmissionList):
    ranked = compute_priority_scores(payload.data)
    return {"ranked_submissions": ranked}

