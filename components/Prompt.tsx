import { person } from "@/lib/content";

export function Prompt({
  path = "~",
  cmd,
  cursor = false,
}: {
  path?: string;
  cmd?: string;
  cursor?: boolean;
}) {
  return (
    <p className="prompt" aria-hidden="true">
      <span className="faint">{person.user}@{person.host}</span>
      <span className="faint">:</span>
      <span className="path">{path}</span>
      <span className="sigil">$</span>{" "}
      {cmd ? <span className="cmd">{cmd}</span> : null}
      {cursor ? <span className="cursor" /> : null}
    </p>
  );
}
