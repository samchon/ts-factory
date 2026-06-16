import type { Expression, SatisfiesExpression, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createSatisfiesExpression = (
  expression: Expression,
  type: TypeNode,
): SatisfiesExpression => make("SatisfiesExpression", { expression, type });
