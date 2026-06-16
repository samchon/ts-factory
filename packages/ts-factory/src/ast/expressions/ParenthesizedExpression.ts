import type { Expression } from "./Expression";

export interface ParenthesizedExpression {
  kind: "ParenthesizedExpression";
  expression: Expression;
}
