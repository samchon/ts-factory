import type {
  Block,
  FunctionDeclaration,
  Identifier,
  ModifierLike,
  ParameterDeclaration,
  Token,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createFunctionDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  asteriskToken: Token | undefined,
  name: string | Identifier | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block | undefined,
): FunctionDeclaration =>
  make("FunctionDeclaration", {
    modifiers,
    asteriskToken,
    name: name === undefined ? undefined : asName(name),
    typeParameters,
    parameters,
    type,
    body,
  });
