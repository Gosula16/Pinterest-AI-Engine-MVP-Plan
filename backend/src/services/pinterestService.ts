const fallbackBoards = [
  { id: "board-1", name: "AI Study Tools" },
  { id: "board-2", name: "Budget Tech Picks" }
];

export async function listBoards() {
  return fallbackBoards;
}

export async function publishPin(pin: { title: string; boardId?: string; imageUrl: string }) {
  return {
    pinterestPinId: `pin_${Buffer.from(pin.title).toString("hex").slice(0, 8)}`,
    boardId: pin.boardId ?? fallbackBoards[0].id,
    status: "posted"
  };
}

export async function getAnalytics(pinIds: string[]) {
  return pinIds.map((id, index) => ({
    pinId: id,
    impressions: 800 + index * 110,
    saves: 35 + index * 4,
    clicks: 28 + index * 3
  }));
}

