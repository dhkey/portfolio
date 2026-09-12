import Link from "next/link";
import { routes } from "@/lib/content";

/** Every inner page as a row of chips. */
export function RouteChips() {
  return (
    <ul className="chip-row">
      {routes.map((r) => (
        <li key={r.path}>
          <Link className="chip" href={r.path}>
            {r.path}
          </Link>
        </li>
      ))}
    </ul>
  );
}
