import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Denys Yazan - Django e-commerce platforms, SMS verification services, Telegram bots and desktop utilities.",
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
              <a
                className="link"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.linkLabel} <span className="arrow">↗</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
