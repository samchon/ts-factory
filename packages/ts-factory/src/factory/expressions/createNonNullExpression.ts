import type { Expression, NonNullExpression } from "../../ast";
import { make } from "../internal/make";

export const createNonNullExpression = (
  expression: Expression,
): NonNullExpression => make("NonNullExpression", { expression });
