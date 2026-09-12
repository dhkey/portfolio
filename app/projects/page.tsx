import type { Metadata } from "next";
import { UrlLink } from "@/components/ExternalLink";
import { PageShell } from "@/components/PageShell";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Denys Yazan - Next.js and Django platforms, SMS verification services, e-commerce sites, Telegram bots and desktop utilities.",
};

export default function Projects() {
  return (
    <PageShell
      path="~/projects"
      cmd="ls -l"
      title="projects"
      intro={`${projects.length} things I designed, built and shipped - most of them end to end.`}
    >
      <ol>
        {projects.map((p, i) => (
          <li key={p.name} className="entry">
            <div className="entry-head">
              <span className="entry-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="entry-name">{p.name}</h2>
            </div>
            <p className="entry-summary">{p.summary}</p>
            <div className="entry-meta">
              <span className="tags">{p.tags.join(" · ")}</span>
              <UrlLink href={p.href} />
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
