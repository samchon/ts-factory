import type { TypeNode } from "../types/TypeNode";
import type { Expression } from "./Expression";

export interface SatisfiesExpression {
  kind: "SatisfiesExpression";
  expression: Expression;
  type: TypeNode;
}
