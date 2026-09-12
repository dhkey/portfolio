/** An anchor that opens in a new tab without giving that page a handle back to this one. */
export function ExternalLink(props: React.ComponentProps<"a">) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

/** An inline `.link` labelled with its own URL: "github.com/dhkey ↗". */
export function UrlLink({ href }: { href: string }) {
  return (
    <ExternalLink className="link" href={href}>
      {href.replace(/^https?:\/\/(www\.)?/, "")} <span className="arrow">↗</span>
    </ExternalLink>
  );
}
