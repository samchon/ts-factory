import type { Expression, NewExpression, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createNewExpression = (
  expression: Expression,
  typeArguments: readonly TypeNode[] | undefined,
  argumentsArray: readonly Expression[] | undefined,
): NewExpression =>
  make("NewExpression", {
    expression,
    typeArguments,
    arguments: argumentsArray,
  });
