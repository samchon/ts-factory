import type { AsExpression, Expression, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createAsExpression = (
  expression: Expression,
  type: TypeNode,
): AsExpression => make("AsExpression", { expression, type });
