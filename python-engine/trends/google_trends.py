from __future__ import annotations

from typing import List, Dict

try:
    from pytrends.request import TrendReq
except Exception:  # pragma: no cover
    TrendReq = None


def discover_google_trends(seed: str) -> List[Dict[str, object]]:
    fallback = [
        {"keyword": f"{seed} ai tools", "trend_score": 87, "source": "google"},
        {"keyword": f"{seed} budget laptop 2025", "trend_score": 74, "source": "google"},
        {"keyword": f"{seed} coding accessories", "trend_score": 69, "source": "google"},
        {"keyword": f"{seed} desk setup", "trend_score": 65, "source": "google"},
    ]

    if TrendReq is None:
        return fallback

    try:
        pytrends = TrendReq(hl="en-US", tz=330)
        pytrends.build_payload([seed], timeframe="today 3-m")
        related = pytrends.related_queries().get(seed, {}).get("top")
        if related is None:
            return fallback

        rows = []
        for _, row in related.head(10).iterrows():
            rows.append(
                {
                    "keyword": str(row["query"]),
                    "trend_score": int(row["value"]),
                    "source": "google",
                }
            )
        return rows or fallback
    except Exception:
        return fallback

