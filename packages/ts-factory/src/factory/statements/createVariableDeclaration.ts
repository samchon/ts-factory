import type {
  Expression,
  Identifier,
  Token,
  TypeNode,
  VariableDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createVariableDeclaration = (
  name: string | Identifier,
  exclamationToken?: Token,
  type?: TypeNode,
  initializer?: Expression,
): VariableDeclaration =>
  make("VariableDeclaration", {
    name: asName(name),
    exclamationToken,
    type,
    initializer,
  });
