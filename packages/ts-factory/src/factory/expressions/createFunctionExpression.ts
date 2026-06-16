import type {
  Block,
  FunctionExpression,
  Identifier,
  ModifierLike,
  ParameterDeclaration,
  Token,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createFunctionExpression = (
  modifiers: readonly ModifierLike[] | undefined,
  asteriskToken: Token | undefined,
  name: string | Identifier | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block,
): FunctionExpression =>
  make("FunctionExpression", {
    modifiers,
    asteriskToken,
    name: name === undefined ? undefined : asName(name),
    typeParameters,
    parameters,
    type,
    body,
  });
