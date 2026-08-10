import { defineType, defineField } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile Info",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Primary Biography / Intro",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subBio",
      title: "Secondary Biography / Intro",
      type: "text",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cvEnglish",
      title: "CV (English Version)",
      type: "file",
      options: {
        accept: ".pdf"
      }
    }),
    defineField({
      name: "cvSpanish",
      title: "CV (Spanish Version)",
      type: "file",
      options: {
        accept: ".pdf"
      }
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
  ],
});
