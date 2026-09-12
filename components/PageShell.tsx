import Link from "next/link";
import { stagger } from "@/lib/stagger";
import { Prompt } from "./Prompt";

export function PageShell({
  path,
  cmd,
  title,
  intro,
  back = "cd ..",
  children,
}: {
  path: string;
  cmd: string;
  title: string;
  intro?: string;
  /** Label of the footer link home. */
  back?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="page stack-l">
      <header className="stack-s rise" style={stagger(0)}>
        <Prompt path={path} cmd={cmd} />
        <h1 className="title">{title}</h1>
        {intro ? <p className="muted prose">{intro}</p> : null}
      </header>

      <div className="rise" style={stagger(1)}>
        {children}
      </div>

      <footer className="stack-s rise" style={stagger(2)}>
        <hr className="rule" />
        <div className="chip-row">
          <Link className="chip" href="/">
            {back}
          </Link>
        </div>
      </footer>
    </main>
  );
}
