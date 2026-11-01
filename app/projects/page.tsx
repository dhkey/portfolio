import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ExternalLink } from "@/components/ExternalLink";
import { projects, projectTypes } from "@/content/projects";

const FILTERS = ["all", ...projectTypes];

const flagOf = (filter: string) =>
  filter === "all" ? "--all" : `--type=${filter}`;

const hrefOf = (filter: string) =>
  filter === "all" ? "/projects" : `/projects?type=${filter}`;

const projectsOf = (filter: string) =>
  filter === "all" ? projects : projects.filter((p) => p.type === filter);

export default async function Projects({
  searchParams,
}: Readonly<{ searchParams: Promise<{ type?: string }> }>) {
  const { type } = await searchParams;
  const filter = FILTERS.find((f) => f === type) ?? "all";
  const shown = projectsOf(filter);

  return (
    <PageShell
      path="~/projects"
      cmd={
        <>
          ls -l
          {filter !== "all" && <span className="opt"> {flagOf(filter)}</span>}
        </>
      }
      title="projects"
      intro={`${projects.length} things I designed, built and shipped - most of them end to end.`}
    >
      <div className="stack-s">
        <nav className="chip-row" aria-label="Filter projects by type">
          {FILTERS.map((f) => (
            <Link
              key={f}
              href={hrefOf(f)}
              replace
              scroll={false}
              className="flag"
              aria-current={f === filter ? "page" : undefined}
            >
              {flagOf(f)}
              <span className="flag-count">{projectsOf(f).length}</span>
            </Link>
          ))}
        </nav>

        <p className="total">total {shown.length}</p>

        <ol key={filter} className="rise">
          {shown.map((p, i) => (
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
                <ExternalLink href={p.href}>{p.linkLabel}</ExternalLink>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
