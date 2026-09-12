import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Prompt } from "@/components/Prompt";
import { RouteChips } from "@/components/RouteChips";

export const metadata: Metadata = {
  title: "404 - no such file or directory",
};

export default function NotFound() {
  return (
    <PageShell
      path="~"
      cmd="cd ./nowhere"
      title="404"
      intro="no such file or directory"
      back="cd ~"
    >
      <section className="stack-s">
        <Prompt path="~" cmd="ls" />
        <RouteChips />
      </section>
    </PageShell>
  );
}
