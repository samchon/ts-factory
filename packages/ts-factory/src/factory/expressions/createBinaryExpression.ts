import type { BinaryExpression, Expression, Token } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createBinaryExpression = (
  left: Expression,
  operator: SyntaxKind | Token,
  right: Expression,
): BinaryExpression =>
  make("BinaryExpression", {
    left,
    operator: typeof operator === "object" ? (operator as any).token : operator,
    right,
  });
