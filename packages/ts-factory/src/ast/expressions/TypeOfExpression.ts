import type { Expression } from "./Expression";

export interface TypeOfExpression {
  kind: "TypeOfExpression";
  expression: Expression;
}
