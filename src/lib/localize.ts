import type { Locale, LocalizedText } from "../types";

export function localize(text: LocalizedText, locale: Locale = "en"): string {
  return text[locale] ?? text.en;
}
