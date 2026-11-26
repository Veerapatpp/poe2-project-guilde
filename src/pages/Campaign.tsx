import { ActSection } from "../components/ActSection";
import { acts } from "../data";
import { useCampaignStore } from "../stores/useCampaignStore";

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
        </div>
    );
};
