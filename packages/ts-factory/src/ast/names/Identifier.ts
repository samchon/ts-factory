import type { Expression } from "../expressions/Expression";

export interface Identifier extends Expression {
  kind: "Identifier";
  text: string;
}
