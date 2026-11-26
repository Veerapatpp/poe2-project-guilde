import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    initialTimerState,
    pauseTimer,
    resetTimer,
    splitTimer,
    startTimer,
    undoSplit,
    type TimerState,
} from "../lib/timer";

type TimerActions = {
    start: () => void;
    pause: () => void;
    split: () => void;
    undoSplit: () => void;
    reset: () => void;
};

// Versioned key: bump the suffix (and add `migrate`) when the stored shape changes.
export const useTimerStore = create<TimerState & TimerActions>()(
    persist(
        (set) => ({
            ...initialTimerState,
            start: () => set((state) => startTimer(state, Date.now())),
            pause: () => set((state) => pauseTimer(state, Date.now())),
            split: () => set((state) => splitTimer(state, Date.now())),
            undoSplit: () => set((state) => undoSplit(state)),
            reset: () => set(resetTimer()),
        }),
        {
            name: "poe2c:v1:timer",
            version: 1,
            storage: createJSONStorage(() => localStorage),
            // Persist data only, not the action functions.
            partialize: (state) => ({
                status: state.status,
                startedAt: state.startedAt,
                elapsedMs: state.elapsedMs,
                splits: state.splits,
            }),
        },
    ),
);
