type PinMetric = {
  id: string;
  title: string;
  templateColor: string;
  ctr: number;
  impressions: number;
};

export function evaluatePinPerformance(
  pins: PinMetric[],
  thresholds: { cloneCtr: number; mutateCtr: number; minImpressions: number }
) {
  const eligible = pins.filter((pin) => pin.impressions >= thresholds.minImpressions);
  const clones = eligible.filter((pin) => pin.ctr >= thresholds.cloneCtr);
  const mutations = eligible.filter((pin) => pin.ctr <= thresholds.mutateCtr);

  return {
    clones,
    mutations,
    suggestedColor: clones[0]?.templateColor ?? "#1d4ed8"
  };
}

