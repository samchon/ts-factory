import type { ElementAccessExpression, Expression } from "../../ast";
import { make } from "../internal/make";
import { createNumericLiteral } from "../literals/createNumericLiteral";

export const createElementAccessExpression = (
  expression: Expression,
  index: number | Expression,
): ElementAccessExpression =>
  make("ElementAccessExpression", {
    expression,
    argumentExpression:
      typeof index === "number" ? createNumericLiteral(index) : index,
  });
