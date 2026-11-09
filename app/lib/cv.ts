import { Profile } from "@/app/types/profile";

export interface CvLinks {
  es: string;
  en: string;
}

/**
 * Los dos CV. Vienen de Sanity (campos cvSpanish y cvEnglish); si falta
 * alguno, se usa la copia local de /public.
 */
export function getCvLinks(profile: Profile): CvLinks {
  return {
    es: profile.cvSpanish || "/cv_andre_melendez_español.pdf",
    en: profile.cvEnglish || "/cv_andre_melendez_english.pdf",
  };
}
