import type {
  Expression,
  ExpressionWithTypeArguments,
  TypeNode,
} from "../../ast";
import { make } from "../internal/make";

export const createExpressionWithTypeArguments = (
  expression: Expression,
  typeArguments: readonly TypeNode[] | undefined,
): ExpressionWithTypeArguments =>
  make("ExpressionWithTypeArguments", { expression, typeArguments });
