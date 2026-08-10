export interface Profile {
  fullName: string;
  title: string;
  bio: string;
  subBio?: string;
  profileImage?: string; // URL parsed from Sanity image asset
  cvEnglish?: string; // URL parsed from Sanity file asset
  cvSpanish?: string; // URL parsed from Sanity file asset
  github?: string;
  linkedin?: string;
  email: string;
}
