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
      {/* Hasta que se rediseñen, estas dos conservan su espaciado anterior. */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-32 px-8 pb-20 sm:px-20">
        <SkillsSection />
        <ContactSection profile={profile} />
      </div>
    </div>
  );
}
