import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ExternalLink } from "@/components/ExternalLink";
import { contacts, person } from "@/content/person";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Denys Yazan - email, phone, LinkedIn and GitHub. Based in Prague, open to new opportunities and collaboration.",
};

function contactValue({ label, href }: (typeof contacts)[number]) {
  if (!href) return <span className="muted">{label}</span>; // location row
  if (href.startsWith("http")) return <ExternalLink href={href}>{label}</ExternalLink>; // external links like linkedin
  return ( <a className="link" href={href}> {label} </a>); // email and phone
}

export default function Contact() {
  return (
    <PageShell
      path="~/contact"
      cmd="cat contact.env"
      title="contact"
      intro="Open to new opportunities and collaboration. Always eager to learn from experienced engineers and sharpen my grasp of industry practice."
    >
      <div className="stack-m">
        <ul>
          {contacts.map((contact) => (
            <li key={contact.key} className="kv">
              <span className="kv-key">{contact.key}</span>
              <span className="kv-val">
                {contactValue(contact)}
              </span>
            </li>
          ))}
        </ul>

        <section className="stack-s">
          <h2 className="section-head">let&rsquo;s work together</h2>
          <div className="chip-row">
            <a className="chip" href={`mailto:${person.email}`}>
              ./send-email
            </a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
