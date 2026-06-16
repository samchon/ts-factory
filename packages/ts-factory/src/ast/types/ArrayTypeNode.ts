import type { TypeNode } from "./TypeNode";

export interface ArrayTypeNode {
  kind: "ArrayTypeNode";
  elementType: TypeNode;
}
