import type { Expression } from "./Expression";

export interface NumericLiteral extends Expression {
  kind: "NumericLiteral";
  text: string;
}
