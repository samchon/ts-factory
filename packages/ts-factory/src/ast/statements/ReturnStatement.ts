import type { Expression } from "../expressions/Expression";

export interface ReturnStatement {
  kind: "ReturnStatement";
  expression?: Expression;
}
