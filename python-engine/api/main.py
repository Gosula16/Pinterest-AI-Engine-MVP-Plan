from fastapi import FastAPI, Query

from trends.google_trends import discover_google_trends
from trends.scoring import score_keywords

app = FastAPI(title="Pinterest AI Engine Trend Service")


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/trends/discover")
def discover(seed: str = Query(..., min_length=2)):
    keywords = discover_google_trends(seed)
    return {"keywords": keywords}


@app.get("/trends/score")
def score(seed: str = Query(..., min_length=2)):
    keywords = discover_google_trends(seed)
    return {"keywords": score_keywords(keywords)}

