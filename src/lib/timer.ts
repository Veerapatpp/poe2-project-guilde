export type TimerStatus = "idle" | "running" | "paused";

/**
 * Stored as timestamps instead of a ticking counter, so the elapsed time stays
 * correct after a page reload or while the tab is in the background.
 */
export type TimerState = {
    status: TimerStatus;
    /** Date.now() when the current run started. Only set while running. */
    startedAt: number | null;
    /** Time gathered before the current run (from earlier start/pause cycles). */
    elapsedMs: number;
    /** Total elapsed time at the moment of each split, in order. */
    splits: number[];
};

export const initialTimerState: TimerState = {
    status: "idle",
    startedAt: null,
    elapsedMs: 0,
    splits: [],
};

export const getElapsed = (state: TimerState, now: number) =>
    state.status === "running" && state.startedAt !== null
        ? state.elapsedMs + Math.max(0, now - state.startedAt)
        : state.elapsedMs;

export const startTimer = (state: TimerState, now: number): TimerState =>
    state.status === "running" ? state : { ...state, status: "running", startedAt: now };

export const pauseTimer = (state: TimerState, now: number): TimerState =>
    state.status === "running"
        ? { ...state, status: "paused", startedAt: null, elapsedMs: getElapsed(state, now) }
        : state;

/** Records the current total time. Ignored unless the timer is running. */
export const splitTimer = (state: TimerState, now: number): TimerState =>
    state.status === "running" ? { ...state, splits: [...state.splits, getElapsed(state, now)] } : state;

/** Removes the latest split, e.g. after pressing split by mistake. */
export const undoSplit = (state: TimerState): TimerState => ({ ...state, splits: state.splits.slice(0, -1) });

export const resetTimer = (): TimerState => initialTimerState;

/** Time spent in each split: the gap between a split and the one before it. */
export const getSegments = (splits: readonly number[]) =>
    splits.map((split, index) => split - (index === 0 ? 0 : splits[index - 1]));

export const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (value: number) => String(value).padStart(2, "0");
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
};
