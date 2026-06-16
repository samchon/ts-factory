import type { AwaitExpression, Expression } from "../../ast";
import { make } from "../internal/make";

export const createAwaitExpression = (
  expression: Expression,
): AwaitExpression => make("AwaitExpression", { expression });
