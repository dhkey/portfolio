import Link from "next/link";
import { Prompt } from "./Prompt";

export function PageShell({
  path,
  cmd,
  title,
  intro,
  children,
}: {
  path: string;
  cmd: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="page stack-l">
      <header className="stack-s rise" style={{ "--i": 0 } as React.CSSProperties}>
        <Prompt path={path} cmd={cmd} />
        <h1 className="title">{title}</h1>
        {intro ? <p className="muted lede">{intro}</p> : null}
      </header>

      <div className="rise" style={{ "--i": 1 } as React.CSSProperties}>
        {children}
      </div>

      <footer className="stack-s rise" style={{ "--i": 2 } as React.CSSProperties}>
        <hr className="rule" />
        <div className="chip-row">
          <Link className="chip" href="/">
            cd ..
          </Link>
        </div>
      </footer>
    </main>
  );
}
