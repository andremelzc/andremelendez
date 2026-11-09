import type { Metadata } from "next";
import HomeSection from "@/app/components/sections/HomeSection";
import ProjectsSection from "@/app/components/sections/ProjectsSection";
import SkillsSection from "@/app/components/sections/SkillsSection";
import ContactSection from "@/app/components/sections/ContactSection";
import { socialUrls } from "@/app/data/urls";
import { buildMetadata, defaultDescription, siteUrl } from "@/app/lib/metadata";
import { getProfile } from "@/app/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return buildMetadata(profile, {
    description: defaultDescription(profile),
    path: "/",
  });
}

export default async function Home() {
  const profile = await getProfile();

  // Datos estructurados: le dicen a los buscadores quién es la persona del sitio.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.title,
    description: defaultDescription(profile),
    url: siteUrl,
    sameAs: [
      profile.github || socialUrls.github,
      profile.linkedin || socialUrls.linkedin,
    ].filter(Boolean),
  };

  return (
    <div className="font-sans">
      <script
        type="application/ld+json"
        // "<" escapado para que el JSON no pueda cerrar la etiqueta <script>.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <HomeSection profile={profile} />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection profile={profile} />
    </div>
  );
}
