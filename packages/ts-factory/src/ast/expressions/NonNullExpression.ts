import type { Expression } from "./Expression";

export interface NonNullExpression {
  kind: "NonNullExpression";
  expression: Expression;
}
