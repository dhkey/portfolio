/** A block of the page under a `label ────` heading. */
export function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="stack-s">
      <h2 className="section-head">{label}</h2>
      {children}
    </section>
  );
}
