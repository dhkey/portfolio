export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {children} <span className="arrow">↗</span>
    </a>
  );
}
