from __future__ import annotations

from typing import List, Dict


def score_keywords(keywords: List[Dict[str, object]]) -> List[Dict[str, object]]:
    scored = []
    for index, keyword in enumerate(keywords):
        base_score = int(keyword.get("trend_score", 50))
        normalized = max(35, min(99, base_score - index * 2))
        scored.append({**keyword, "trend_score": normalized})
    return scored
