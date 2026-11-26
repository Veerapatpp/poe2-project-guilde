import { ActSection } from "../components/ActSection";
import { acts } from "../data";
import { useCampaignStore } from "../stores/useCampaignStore";
import type { Act } from "../types/PoeTypes";

// Attribution is only needed while an act still holds items that are not our own.
const hasThirdParty = (act: Act) => [...act.waypoints, ...act.quests].some((item) => item.origin !== "own");

const sources = [
    ...new Map(
        acts.flatMap((act) => (hasThirdParty(act) && act.source ? [[act.source.url, act.source] as const] : [])),
    ).values(),
];

export const Campaign = () => {
    const progress = useCampaignStore((state) => state.progress);
    const hideCompleted = useCampaignStore((state) => state.hideCompleted);
    const toggle = useCampaignStore((state) => state.toggle);
    const reset = useCampaignStore((state) => state.reset);
    const setHideCompleted = useCampaignStore((state) => state.setHideCompleted);

    return (
        <div className="space-y-6">
            <label className="flex min-h-11 items-center gap-3 text-sm text-zinc-300">
                <input
                    type="checkbox"
                    checked={hideCompleted}
                    onChange={(event) => setHideCompleted(event.target.checked)}
                    className="size-5 accent-amber-500"
                />
                Hide completed
            </label>

            {acts.map((act) => (
                <ActSection
                    key={act.id}
                    act={act}
                    progress={progress}
                    hideCompleted={hideCompleted}
                    onToggle={toggle}
                    onReset={reset}
                />
            ))}

            {sources.length > 0 && (
                <p className="text-xs text-zinc-500">
                    Quest data from{" "}
                    {sources.map((source, index) => (
                        <span key={source.url}>
                            {index > 0 && ", "}
                            <a href={source.url} className="underline" target="_blank" rel="noreferrer">
                                {source.name}
                            </a>{" "}
                            (
                            <a href={source.licenseUrl} className="underline" target="_blank" rel="noreferrer">
                                {source.license}
                            </a>
                            ). Not checked in game yet; items marked unverified may be wrong.
                        </span>
                    ))}
                </p>
            )}
        </div>
    );
};
