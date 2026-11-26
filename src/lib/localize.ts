import type { Locale, LocalizedText } from "../types/PoeTypes";

export const localize = (text: LocalizedText, locale: Locale = "en") => text[locale] ?? text.en;
