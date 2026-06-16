import type { BigIntLiteral } from "../expressions/BigIntLiteral";
import type { NumericLiteral } from "../expressions/NumericLiteral";
import type { StringLiteral } from "../expressions/StringLiteral";
import type { Token } from "../names/Token";

export interface LiteralTypeNode {
  kind: "LiteralTypeNode";
  literal: StringLiteral | NumericLiteral | BigIntLiteral | Token;
}
