import { ExternalLink } from "@/components/ExternalLink";
import { Prompt } from "@/components/Prompt";
import { RouteChips } from "@/components/RouteChips";
import { person, externals } from "@/lib/content";
import { stagger } from "@/lib/stagger";

export default function Home() {
  return (
    <main className="page stack-l">
      <header className="stack-s rise" style={stagger(0)}>
        <Prompt path="~" cmd="whoami" />
        <h1 className="title">{person.name.toLowerCase()}</h1>
        <p className="subtitle">{person.role}</p>
      </header>

      <section className="stack rise" style={stagger(1)}>
        <p className="prose">{person.tagline}</p>
        <p className="muted">{person.status}</p>
      </section>

      <section className="stack-s rise" style={stagger(2)}>
        <Prompt path="~" cmd="ls" />
        <RouteChips />
        <ul className="chip-row">
          {externals.map((e) => (
            <li key={e.path}>
              <ExternalLink className="chip" data-variant="ghost" href={e.href}>
                {e.path}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
