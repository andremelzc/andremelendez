import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfile } from "@/app/lib/sanity";
import LabClient from "./LabClient";

export const metadata: Metadata = {
  title: "Laboratorio de píxeles",
  robots: { index: false, follow: false },
};

/** Solo para desarrollo: en producción esta ruta responde 404. */
export default async function LabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const profile = await getProfile();
  return (
    <LabClient
      photo={profile.profileImage || "/profile.jpg"}
      name={profile.fullName}
    />
  );
}
