import Link from "next/link";
import { Prompt } from "./Prompt";

export function PageShell({
  path,
  cmd,
  title,
  intro,
  children,
}: Readonly<{
  path: string;
  cmd: React.ReactNode;
  title: string;
  intro?: string;
  children: React.ReactNode;
}>) {
  return (
    <main className="page stack-l">
      <header className="stack-s rise">
        <Prompt path={path} cmd={cmd} />
        <h1 className="title">{title}</h1>
        {intro ? <p className="muted lede">{intro}</p> : null}
      </header>

      <div className="rise">
        {children}
      </div>

      <footer className="stack-s rise">
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
