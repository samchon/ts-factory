import type { TypeNode } from "./TypeNode";

export interface TupleTypeNode {
  kind: "TupleTypeNode";
  elements: readonly TypeNode[];
}
