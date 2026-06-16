import type { Expression } from "../expressions/Expression";
import type { Statement } from "./Statement";

export interface IfStatement {
  kind: "IfStatement";
  expression: Expression;
  thenStatement: Statement;
  elseStatement?: Statement;
}
