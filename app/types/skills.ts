export interface SkillItem {
  name: string;
  category: string;
  isFeatured: boolean;
}

export interface Skills {
  skillsList: SkillItem[];
}
