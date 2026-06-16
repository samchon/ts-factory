import type {
  BigIntLiteral,
  LiteralTypeNode,
  NumericLiteral,
  StringLiteral,
  Token,
} from "../../ast";
import { make } from "../internal/make";

export const createLiteralTypeNode = (
  literal: StringLiteral | NumericLiteral | BigIntLiteral | Token,
): LiteralTypeNode => make("LiteralTypeNode", { literal });
