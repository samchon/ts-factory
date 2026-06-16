import type { TypeNode } from "./TypeNode";

export interface UnionTypeNode {
  kind: "UnionTypeNode";
  types: readonly TypeNode[];
}
