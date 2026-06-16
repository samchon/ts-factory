import type { Expression } from "./Expression";

export interface ConditionalExpression {
  kind: "ConditionalExpression";
  condition: Expression;
  whenTrue: Expression;
  whenFalse: Expression;
}
