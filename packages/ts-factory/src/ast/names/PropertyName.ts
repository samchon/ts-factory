import type { NumericLiteral } from "../expressions/NumericLiteral";
import type { StringLiteral } from "../expressions/StringLiteral";
import type { Identifier } from "./Identifier";
import type { PrivateIdentifier } from "./PrivateIdentifier";

export type PropertyName =
  | Identifier
  | StringLiteral
  | NumericLiteral
  | PrivateIdentifier;
