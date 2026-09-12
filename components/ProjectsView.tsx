"use client";

import { useEffect, useState } from "react";
import { PageShell } from "./PageShell";
import { projects, projectTypes, type ProjectType } from "@/lib/content";

type Filter = ProjectType | "all";

const FILTERS: Filter[] = ["all", ...projectTypes];

const flagOf = (f: Filter) => (f === "all" ? "--all" : `--type=${f}`);

const matches = (f: Filter) =>
  f === "all" ? projects : projects.filter((p) => p.type === f);

const COUNTS = Object.fromEntries(
  FILTERS.map((f) => [f, matches(f).length]),
) as Record<Filter, number>;

const isFilter = (v: string | null): v is Filter =>
  v !== null && (FILTERS as string[]).includes(v);

export function ProjectsView() {
  const [filter, setFilter] = useState<Filter>("all");

  // `?type=bot` deep links. Read after mount rather than through
  // useSearchParams, which would drop the page out of static rendering.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("type");
    if (isFilter(q)) setFilter(q);
  }, []);

  function select(next: Filter) {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", next);
    // replace, not push: `back` should leave the page, not undo a filter
    window.history.replaceState(null, "", url);
  }

  const shown = matches(filter);

  return (
    <PageShell
      path="~/projects"
      cmd={
        <>
          ls -l
          {filter !== "all" ? <span className="opt"> {flagOf(filter)}</span> : null}
        </>
      }
      title="projects"
      intro={`${projects.length} things I designed, built and shipped - most of them end to end.`}
    >
      <div className="stack-s">
        <div className="chip-row" role="group" aria-label="Filter projects by type">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className="flag"
              aria-pressed={filter === f}
              onClick={() => select(f)}
            >
              {flagOf(f)}
              <span className="flag-count">{COUNTS[f]}</span>
            </button>
          ))}
        </div>

        <p className="total" aria-live="polite">
          total {shown.length}
        </p>

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
      </div>
    </PageShell>
  );
}
