import type { Habit } from "@/types/Habit.ts";

export function formatFrequencyLabel(frequency: Habit["frequency"]) {
  return frequency === "daily"
    ? "day"
    : frequency === "weekly"
      ? "week"
      : "month";
}
export const isPlural = (val: number) => (val > 1 ? "s" : "");
