import HomeSection from "@/app/components/sections/HomeSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import ContactSection from "@/app/components/sections/ContactSection";
import { getProfile } from "@/app/lib/sanity";

export default async function Home() {
  const profile = await getProfile();

  return (
    <div className="font-sans">
      {/* El hero ocupa todo el ancho; el resto de secciones conserva su
          espaciado hasta que se rediseñen. */}
      <HomeSection profile={profile} />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-32 px-8 pb-20 pt-16 sm:px-20">
        <ProjectsSection />
        <SkillsSection />
        <ContactSection profile={profile} />
      </div>
    </div>
  );
}
