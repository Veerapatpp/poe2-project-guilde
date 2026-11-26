export const LOCALES = ["en", "th", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

/** Multi-language text. `en` is required, other languages fall back to `en`. */
export type LocalizedText = { en: string } & Partial<Record<Exclude<Locale, "en">, string>>;

/** Keep in sync with scripts/validate-data.mjs */
export const REWARD_KINDS = ["passive-point", "resistance", "gem", "item", "other"] as const;
export type RewardKind = (typeof REWARD_KINDS)[number];

export interface Reward {
  kind: RewardKind;
  description: LocalizedText;
}

export interface Waypoint {
  id: string;
  name: LocalizedText;
  /** true only when confirmed in the actual game */
  verified: boolean;
}

export interface Quest {
  id: string;
  name: LocalizedText;
  notes?: LocalizedText;
  rewards: Reward[];
  /** must match a waypoint id in the same act */
  waypointId?: string;
  /** true only when confirmed in the actual game */
  verified: boolean;
}

export interface Act {
  id: string;
  number: number;
  name: LocalizedText;
  waypoints: Waypoint[];
  quests: Quest[];
}
