import type { Expression, ParenthesizedExpression } from "../../ast";
import { make } from "../internal/make";

export const createParenthesizedExpression = (
  expression: Expression,
): ParenthesizedExpression => make("ParenthesizedExpression", { expression });
