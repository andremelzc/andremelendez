import HomeSection from "@/app/components/sections/HomeSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import ContactSection from "@/app/components/sections/ContactSection";
import { getProfile } from "@/app/lib/sanity";

export default async function Home() {
  const profile = await getProfile();

  return (
    <div className="font-sans">
      <HomeSection profile={profile} />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection profile={profile} />
    </div>
  );
}
