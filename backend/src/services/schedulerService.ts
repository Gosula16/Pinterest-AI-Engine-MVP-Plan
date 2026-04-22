type PostingWindows = {
  weekday: string[];
  weekend: string[];
};

export function selectNextScheduleSlot(reference: Date, windows: PostingWindows) {
  const cursor = new Date(reference);

  for (let offset = 0; offset < 7; offset += 1) {
    const candidateDay = new Date(cursor);
    candidateDay.setDate(reference.getDate() + offset);

    const isWeekend = candidateDay.getDay() === 0 || candidateDay.getDay() === 6;
    const daySlots = (isWeekend ? windows.weekend : windows.weekday)
      .map((slot) => {
        const [hours, minutes] = slot.split(":").map(Number);
        const date = new Date(candidateDay);
        date.setHours(hours, minutes, 0, 0);
        return date;
      })
      .sort((a, b) => a.getTime() - b.getTime());

    const nextSameDay = daySlots.find((slot) => slot.getTime() > reference.getTime());
    if (nextSameDay) {
      return nextSameDay;
    }

    if (offset > 0 && daySlots[0]) {
      return daySlots[0];
    }
  }

  const fallback = new Date(reference);
  fallback.setHours(fallback.getHours() + 2, 0, 0, 0);
  return fallback;
}

