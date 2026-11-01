import { person } from "./person";

export const routes: { path: string; label: string }[] = [
  { path: "/projects", label: "what I have shipped" },
  { path: "/blog", label: "notes and write-ups" },
  { path: "/skills", label: "the toolkit" },
  { path: "/about", label: "background" },
  { path: "/contact", label: "how to reach me" },
];

export const externals: { path: string; href: string }[] = [
  { path: "/github", href: person.github },
  { path: "/linkedin", href: person.linkedin },
  { path: "/email", href: `mailto:${person.email}` },
];

export const siteUrl = "https://denys-yazan.dev";
