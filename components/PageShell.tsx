import Link from "next/link";
import { Prompt } from "./Prompt";
import { rise } from "@/lib/rise";

export function PageShell({
  path,
  cmd,
  title,
  intro,
  children,
}: {
  path: string;
  cmd: React.ReactNode;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="page stack-l">
      <header className="stack-s rise" style={rise(0)}>
        <Prompt path={path} cmd={cmd} />
        <h1 className="title">{title}</h1>
        {intro ? <p className="muted lede">{intro}</p> : null}
      </header>

      <div className="rise" style={rise(1)}>
        {children}
      </div>

      <footer className="stack-s rise" style={rise(2)}>
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
