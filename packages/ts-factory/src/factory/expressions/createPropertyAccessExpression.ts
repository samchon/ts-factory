import type {
  Expression,
  Identifier,
  PrivateIdentifier,
  PropertyAccessExpression,
} from "../../ast";
import { make } from "../internal/make";
import { createIdentifier } from "../names/createIdentifier";

export const createPropertyAccessExpression = (
  expression: Expression,
  name: string | Identifier | PrivateIdentifier,
): PropertyAccessExpression =>
  make("PropertyAccessExpression", {
    expression,
    name: typeof name === "string" ? createIdentifier(name) : name,
  });
