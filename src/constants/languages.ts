export const SEED_LANGUAGES = [
  "English",
  "Japanese",
  "Chinese",
  "Korean",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Arabic",
  "Hindi",
] as const;

export type SeedLanguage = typeof SEED_LANGUAGES[number];
