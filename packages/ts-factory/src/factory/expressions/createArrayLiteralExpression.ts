import type { ArrayLiteralExpression, Expression } from "../../ast";
import { make } from "../internal/make";

export const createArrayLiteralExpression = (
  elements: readonly Expression[] = [],
  multiLine?: boolean,
): ArrayLiteralExpression =>
  make("ArrayLiteralExpression", { elements, multiLine });
