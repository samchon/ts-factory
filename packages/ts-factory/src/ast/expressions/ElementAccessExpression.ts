import type { Expression } from "./Expression";

export interface ElementAccessExpression {
  kind: "ElementAccessExpression";
  expression: Expression;
  argumentExpression: Expression;
}
