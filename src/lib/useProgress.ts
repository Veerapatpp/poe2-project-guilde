import { useCallback } from "react";
import { isProgress, resetQuests, toggleQuest, type Progress } from "./progress";
import { useLocalStorage } from "./useLocalStorage";

// Bump the version in the key when the stored shape changes.
const PROGRESS_KEY = "poe2c:v1:progress";

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<Progress>(PROGRESS_KEY, {}, isProgress);

  const toggle = useCallback(
    (questId: string) => setProgress((prev) => toggleQuest(prev, questId)),
    [setProgress],
  );
  const reset = useCallback(
    (questIds: readonly string[]) => setProgress((prev) => resetQuests(prev, questIds)),
    [setProgress],
  );

  return { progress, toggle, reset };
}
