import { acts } from "../data";
import { localize } from "../lib/localize";
import { formatTime, getElapsed, getSegments } from "../lib/timer";
import { useNow } from "../lib/useNow";
import { useTimerStore } from "../stores/useTimerStore";

const buttonClass = "min-h-11 rounded-md bg-zinc-800 px-4 text-sm hover:bg-zinc-700 disabled:opacity-40";

// Split n is named after Act n while acts exist, then falls back to "Split n".
const getSplitLabel = (index: number) => (acts[index] ? localize(acts[index].name) : `Split ${index + 1}`);

export const Timer = () => {
    const status = useTimerStore((state) => state.status);
    const startedAt = useTimerStore((state) => state.startedAt);
    const elapsedMs = useTimerStore((state) => state.elapsedMs);
    const splits = useTimerStore((state) => state.splits);
    const start = useTimerStore((state) => state.start);
    const pause = useTimerStore((state) => state.pause);
    const split = useTimerStore((state) => state.split);
    const undoSplit = useTimerStore((state) => state.undoSplit);
    const reset = useTimerStore((state) => state.reset);

    const running = status === "running";
    const now = useNow(running);
    const total = getElapsed({ status, startedAt, elapsedMs, splits }, now);
    const segments = getSegments(splits);

    return (
        <section className="space-y-3">
            <h2 className="text-lg font-semibold">Timer</h2>
            <p role="timer" aria-live="off" className="font-mono text-4xl tabular-nums">
                {formatTime(total)}
            </p>

            <div className="flex flex-wrap gap-2">
                {running ? (
                    <button type="button" onClick={pause} className={buttonClass}>
                        Pause
                    </button>
                ) : (
                    <button type="button" onClick={start} className={buttonClass}>
                        {status === "paused" ? "Resume" : "Start"}
                    </button>
                )}
                <button type="button" onClick={split} disabled={!running} className={buttonClass}>
                    Split
                </button>
                <button type="button" onClick={undoSplit} disabled={splits.length === 0} className={buttonClass}>
                    Undo split
                </button>
                <button type="button" onClick={reset} disabled={status === "idle"} className={buttonClass}>
                    Reset
                </button>
            </div>

            {splits.length > 0 && (
                <ol className="space-y-1 text-sm">
                    {splits.map((splitTime, index) => (
                        <li key={index} className="flex justify-between gap-2 rounded border border-zinc-800 px-3 py-2">
                            <span>{getSplitLabel(index)}</span>
                            <span className="font-mono tabular-nums text-zinc-400">
                                {formatTime(segments[index])} · {formatTime(splitTime)}
                            </span>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
};
