import type { Expression, PostfixUnaryExpression } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createPostfixUnaryExpression = (
  operand: Expression,
  operator: SyntaxKind,
): PostfixUnaryExpression =>
  make("PostfixUnaryExpression", { operand, operator });
