import type { Expression } from "./Expression";

export interface StringLiteral extends Expression {
  kind: "StringLiteral";
  text: string;
  singleQuote?: boolean;
}
