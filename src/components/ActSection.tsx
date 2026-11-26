import { useState } from "react";
import { localize } from "../lib/localize";
import { getActProgress, type Progress } from "../lib/progress";
import type { Act } from "../types";
import ProgressBar from "./ProgressBar";
import QuestItem from "./QuestItem";

interface Props {
  act: Act;
  progress: Progress;
  hideCompleted: boolean;
  onToggle: (questId: string) => void;
  onReset: (questIds: readonly string[]) => void;
}

export default function ActSection({ act, progress, hideCompleted, onToggle, onReset }: Props) {
  // Two-step inline confirm instead of window.confirm, which blocks the page.
  const [confirming, setConfirming] = useState(false);

  const stats = getActProgress(act, progress);
  const waypointNames = new Map(act.waypoints.map((waypoint) => [waypoint.id, localize(waypoint.name)]));
  const quests = hideCompleted ? act.quests.filter((quest) => progress[quest.id] !== true) : act.quests;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{localize(act.name)}</h2>
        {confirming ? (
          <span className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => {
                onReset(act.quests.map((quest) => quest.id));
                setConfirming(false);
              }}
              className="min-h-11 rounded-md bg-red-900 px-3"
            >
              Confirm reset
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="min-h-11 rounded-md bg-zinc-800 px-3">
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={stats.done === 0}
            className="min-h-11 rounded-md px-3 text-sm text-zinc-400 hover:text-white disabled:opacity-40"
          >
            Reset
          </button>
        )}
      </div>

      <ProgressBar progress={stats} label="Progress" />

      {quests.length === 0 ? (
        <p className="text-sm text-zinc-500">{act.quests.length === 0 ? "No quests yet." : "All quests done."}</p>
      ) : (
        <ul className="space-y-2">
          {quests.map((quest) => (
            <QuestItem
              key={quest.id}
              quest={quest}
              waypointName={quest.waypointId ? waypointNames.get(quest.waypointId) : undefined}
              done={progress[quest.id] === true}
              onToggle={() => onToggle(quest.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
