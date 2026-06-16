import type { ConditionalExpression, Expression, Token } from "../../ast";
import { make } from "../internal/make";

export const createConditionalExpression = (
  condition: Expression,
  _questionToken: Token | undefined,
  whenTrue: Expression,
  _colonToken: Token | undefined,
  whenFalse: Expression,
): ConditionalExpression =>
  make("ConditionalExpression", { condition, whenTrue, whenFalse });
