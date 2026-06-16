import type { Identifier } from "../names/Identifier";
import type { PrivateIdentifier } from "../names/PrivateIdentifier";
import type { Expression } from "./Expression";

export interface PropertyAccessExpression {
  kind: "PropertyAccessExpression";
  expression: Expression;
  name: Identifier | PrivateIdentifier;
}
