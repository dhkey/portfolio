import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { skillGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frameworks, infrastructure and engineering practices Denys Yazan works with - Python, Django, FastAPI, Docker, PostgreSQL and more.",
};

export default function Skills() {
  return (
    <PageShell
      path="~/skills"
      cmd="cat stack.txt"
      title="skills"
      intro="The tools I reach for, grouped by what they are for."
    >
      <div className="stack-m">
        {skillGroups.map((group) => (
          <section key={group.label} className="stack-s">
            <h2 className="section-head">{group.label}</h2>
            <ul className="chip-row">
              {group.items.map((item) => (
                <li key={item} className="chip" data-variant="ghost">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
