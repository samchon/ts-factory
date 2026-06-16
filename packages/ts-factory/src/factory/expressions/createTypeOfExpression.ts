import type { Expression, TypeOfExpression } from "../../ast";
import { make } from "../internal/make";

export const createTypeOfExpression = (
  expression: Expression,
): TypeOfExpression => make("TypeOfExpression", { expression });
