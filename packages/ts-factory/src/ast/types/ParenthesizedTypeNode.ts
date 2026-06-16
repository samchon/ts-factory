import type { TypeNode } from "./TypeNode";

export interface ParenthesizedTypeNode {
  kind: "ParenthesizedTypeNode";
  type: TypeNode;
}
