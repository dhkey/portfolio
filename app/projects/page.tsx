import type { Metadata } from "next";
import { ProjectsView } from "@/components/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Denys Yazan - Next.js and Django platforms, SMS verification services, e-commerce sites, Telegram bots and desktop utilities.",
};

export default function Projects() {
  return <ProjectsView />;
}
