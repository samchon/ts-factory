import type { CallExpression, Expression, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createCallExpression = (
  expression: Expression,
  typeArguments: readonly TypeNode[] | undefined,
  argumentsArray: readonly Expression[] | undefined,
): CallExpression =>
  make("CallExpression", {
    expression,
    typeArguments,
    arguments: argumentsArray ?? [],
  });
