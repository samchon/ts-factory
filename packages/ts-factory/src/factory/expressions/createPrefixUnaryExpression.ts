import type { Expression, PrefixUnaryExpression } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createPrefixUnaryExpression = (
  operator: SyntaxKind,
  operand: Expression,
): PrefixUnaryExpression =>
  make("PrefixUnaryExpression", { operator, operand });
