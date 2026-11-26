import type { ActProgress } from "../lib/progress";

type Props = {
    progress: ActProgress;
    label: string;
};

export const ProgressBar = ({ progress, label }: Props) => {
    const { done, total, percent } = progress;
    return (
        <div>
            <div className="mb-1 flex justify-between text-xs text-zinc-400">
                <span>{label}</span>
                <span>
                    {done}/{total} · {percent}%
                </span>
            </div>
            <div
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="h-2 overflow-hidden rounded-full bg-zinc-800"
            >
                <div className="h-full bg-amber-500 transition-[width]" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
};
