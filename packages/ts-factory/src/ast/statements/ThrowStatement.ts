import type { Expression } from "../expressions/Expression";

export interface ThrowStatement {
  kind: "ThrowStatement";
  expression: Expression;
}
