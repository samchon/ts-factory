import type { Expression } from "./Expression";

export interface BigIntLiteral extends Expression {
  kind: "BigIntLiteral";
  text: string;
}
