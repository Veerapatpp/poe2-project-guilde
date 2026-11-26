import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { resetQuests, toggleQuest, type Progress } from "../lib/progress";

type CampaignState = {
    progress: Progress;
    hideCompleted: boolean;
    toggle: (questId: string) => void;
    reset: (questIds: readonly string[]) => void;
    setHideCompleted: (hideCompleted: boolean) => void;
};

// Versioned key: bump the suffix (and add `migrate`) when the stored shape changes.
export const useCampaignStore = create<CampaignState>()(
    persist(
        (set) => ({
            progress: {},
            hideCompleted: false,
            toggle: (questId) => set((state) => ({ progress: toggleQuest(state.progress, questId) })),
            reset: (questIds) => set((state) => ({ progress: resetQuests(state.progress, questIds) })),
            setHideCompleted: (hideCompleted) => set({ hideCompleted }),
        }),
        {
            name: "poe2c:v1:campaign",
            version: 1,
            storage: createJSONStorage(() => localStorage),
            // Persist data only, not the action functions.
            partialize: (state) => ({ progress: state.progress, hideCompleted: state.hideCompleted }),
        },
    ),
);
