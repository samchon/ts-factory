import type { Expression, ExpressionStatement } from "../../ast";
import { make } from "../internal/make";

export const createExpressionStatement = (
  expression: Expression,
): ExpressionStatement => make("ExpressionStatement", { expression });
