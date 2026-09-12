import type { CSSProperties } from "react";

/** Style for the nth `.rise` element - each one fades in 70ms after the one before. */
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
