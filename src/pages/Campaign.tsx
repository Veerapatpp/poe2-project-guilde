import { ActSection } from "../components/ActSection";
import { acts } from "../data";
import { useCampaignStore } from "../stores/useCampaignStore";

export const Campaign = () => {
    const progress = useCampaignStore((state) => state.progress);
    const hideCompleted = useCampaignStore((state) => state.hideCompleted);
    const toggle = useCampaignStore((state) => state.toggle);
    const reset = useCampaignStore((state) => state.reset);
    const setHideCompleted = useCampaignStore((state) => state.setHideCompleted);

    // One line per distinct source, so the CC BY-NC-SA attribution is always visible.
    const sources = [...new Map(acts.map((act) => [act.source.url, act.source])).values()];

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
                        )
                    </span>
                ))}
                . Not checked in game yet; items marked unverified may be wrong.
            </p>
        </div>
    );
};
