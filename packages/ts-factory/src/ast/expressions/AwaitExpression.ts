import type { Expression } from "./Expression";

export interface AwaitExpression {
  kind: "AwaitExpression";
  expression: Expression;
}
