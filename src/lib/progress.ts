import type { Act } from "../types";

/** Completed quest ids. Missing key = not completed. */
export type Progress = Record<string, true>;

export interface ActProgress {
  done: number;
  total: number;
  percent: number;
}

export function isProgress(value: unknown): value is Progress {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getActProgress(act: Act, progress: Progress): ActProgress {
  const total = act.quests.length;
  const done = act.quests.filter((quest) => progress[quest.id] === true).length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function toggleQuest(progress: Progress, questId: string): Progress {
  const next = { ...progress };
  if (next[questId]) delete next[questId];
  else next[questId] = true;
  return next;
}

export function resetQuests(progress: Progress, questIds: readonly string[]): Progress {
  const next = { ...progress };
  for (const id of questIds) delete next[id];
  return next;
}
