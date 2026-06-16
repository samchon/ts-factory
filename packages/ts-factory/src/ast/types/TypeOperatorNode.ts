import type { SyntaxKind } from "../../syntax";
import type { TypeNode } from "./TypeNode";

export interface TypeOperatorNode {
  kind: "TypeOperatorNode";
  operator: SyntaxKind;
  type: TypeNode;
}
