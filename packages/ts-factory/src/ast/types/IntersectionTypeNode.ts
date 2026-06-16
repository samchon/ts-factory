import type { TypeNode } from "./TypeNode";

export interface IntersectionTypeNode {
  kind: "IntersectionTypeNode";
  types: readonly TypeNode[];
}
