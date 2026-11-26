import { localize } from "../lib/localize";
import type { Quest } from "../types/PoeTypes";

type Props = {
    quest: Quest;
    waypointName?: string;
    done: boolean;
    onToggle: () => void;
};

export const QuestItem = ({ quest, waypointName, done, onToggle }: Props) => {
    return (
        <li className="rounded-lg border border-zinc-800">
            <label className="flex min-h-11 cursor-pointer items-start gap-3 p-3">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={onToggle}
                    className="mt-0.5 size-5 shrink-0 accent-amber-500"
                />
                <span className="flex-1">
                    <span className={`block ${done ? "text-zinc-500 line-through" : ""}`}>
                        {localize(quest.name)}
                    </span>
                    {waypointName && <span className="block text-xs text-zinc-500">Waypoint: {waypointName}</span>}
                    {quest.notes && <span className="mt-1 block text-sm text-zinc-400">{localize(quest.notes)}</span>}
                    {quest.rewards.length > 0 && (
                        <span className="mt-2 flex flex-wrap gap-1">
                            {quest.rewards.map((reward, index) => (
                                <span key={index} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                                    {localize(reward.description)}
                                </span>
                            ))}
                        </span>
                    )}
                </span>
                {!quest.verified && (
                    <span className="shrink-0 rounded bg-amber-900/50 px-2 py-0.5 text-xs text-amber-300">
                        unverified
                    </span>
                )}
            </label>
        </li>
    );
};
