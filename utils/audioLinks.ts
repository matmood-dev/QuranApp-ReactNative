// src/utils/audioLinks.ts
import rawData from "../data/audioLinks.json";

type Reciter = {
  id: string;
  name: string;
  baseUrl?: string;
  format?: string;
  pattern?: string;
  surahs: { number: number; name: string; url?: string }[];
};

const DATA: Reciter[] = Array.isArray(rawData) ? rawData : [rawData];

// Remove diacritics, "سورة", punctuation, normalize hamza/wasla, ta marbuta, alif maqsura
const AR_DIACRITICS = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
function normalizeArabic(s: string) {
  return s
    .replace(/^\s*سورة\s+/u, "")      // drop leading "سورة "
    .replace(AR_DIACRITICS, "")       // strip harakat
    .replace(/\u0671/g, "ا")          // ٱ -> ا
    .replace(/[آأإ]/g, "ا")           // normalize alef forms
    .replace(/ة/g, "ه")               // ta marbuta -> ha
    .replace(/ى/g, "ي")               // alif maqsura -> ya
    .replace(/[^\p{L}\p{N}]/gu, "")   // remove punctuation/spacing
    .trim();
}

export function getSurahUrl(reciterId: string, surah: string | number): string {
  const reciter = DATA.find((r) => r.id === reciterId);
  if (!reciter) throw new Error(`Reciter not found: ${reciterId}`);

  let s: Reciter["surahs"][number] | undefined;

  if (typeof surah === "number") {
    s = reciter.surahs.find((x) => x.number === surah);
  } else {
    const target = normalizeArabic(surah);
    s =
      reciter.surahs.find((x) => normalizeArabic(x.name) === target) ||
      // fallback: some lists include/omit "سورة" in the middle; try contains
      reciter.surahs.find((x) => normalizeArabic(x.name).includes(target));
  }

  if (!s) throw new Error(`Surah not found for ${surah} in ${reciterId}`);

  if (s.url) return s.url;

  if (reciter.baseUrl && reciter.pattern && typeof surah === "number") {
    const num3 = String(surah).padStart(3, "0");
    return `${reciter.baseUrl}/${reciter.pattern.replace("{num3}", num3)}`;
  }

  throw new Error(`No URL/pattern for ${surah} in ${reciterId}`);
}
