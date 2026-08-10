import HomeSection from "@/app/components/sections/HomeSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import ContactSection from "@/app/components/sections/ContactSection";
import ModernBackground from "@/app/components/ui/ModernBackground";
import { getProfile } from "@/app/lib/sanity";

export default async function Home() {
  const profile = await getProfile();

  return (
    <div className="relative font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-32 sm:p-20">
      <ModernBackground />
      <HomeSection profile={profile} />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection profile={profile} />
    </div>
  );
}
