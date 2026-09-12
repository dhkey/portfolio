import { person } from "@/lib/content";

export function Prompt({ path, cmd }: { path: string; cmd: string }) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="faint">
        {person.user}@{person.host}:
      </span>
      <span className="path">{path}</span>
      <span className="sigil">$</span> <span className="cmd">{cmd}</span>
    </p>
  );
}
