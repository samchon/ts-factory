import type { TypeNode } from "./TypeNode";

export interface IndexedAccessTypeNode {
  kind: "IndexedAccessTypeNode";
  objectType: TypeNode;
  indexType: TypeNode;
}
