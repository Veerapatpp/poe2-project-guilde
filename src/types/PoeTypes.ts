export const LOCALES = ["en", "th", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

/** Multi-language text. `en` is required, other languages fall back to `en`. */
export type LocalizedText = { en: string } & Partial<Record<Exclude<Locale, "en">, string>>;

/** Keep in sync with scripts/validate-data.mjs */
export const REWARD_KINDS = ["passive-point", "resistance", "gem", "item", "other"] as const;
export type RewardKind = (typeof REWARD_KINDS)[number];

/** Keep in sync with scripts/validate-data.mjs. "own" = written by us from our own playthrough. */
export const ORIGINS = ["own"] as const;
export type Origin = (typeof ORIGINS)[number];

export type Reward = {
    kind: RewardKind;
    description: LocalizedText;
};

export type Waypoint = {
    id: string;
    name: LocalizedText;
    origin: Origin;
    /** true only when confirmed in the actual game */
    verified: boolean;
};

export type Quest = {
    id: string;
    name: LocalizedText;
    notes?: LocalizedText;
    rewards: Reward[];
    /** must match a waypoint id in the same act */
    waypointId?: string;
    origin: Origin;
    /** true only when confirmed in the actual game */
    verified: boolean;
};

export type DataSource = {
    name: string;
    url: string;
    license: string;
    licenseUrl: string;
    /** YYYY-MM-DD the data was copied or checked */
    retrievedAt: string;
};

export type Act = {
    id: string;
    number: number;
    name: LocalizedText;
    /** required while any waypoint or quest in this act is not origin "own" */
    source?: DataSource;
    waypoints: Waypoint[];
    quests: Quest[];
};
