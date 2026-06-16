import type { TypeNode } from "../types/TypeNode";
import type { Expression } from "./Expression";

export interface AsExpression {
  kind: "AsExpression";
  expression: Expression;
  type: TypeNode;
}
