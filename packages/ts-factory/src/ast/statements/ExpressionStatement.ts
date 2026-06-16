import type { Expression } from "../expressions/Expression";

export interface ExpressionStatement {
  kind: "ExpressionStatement";
  expression: Expression;
}
