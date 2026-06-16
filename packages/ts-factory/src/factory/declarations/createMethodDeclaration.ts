import type {
  Block,
  MethodDeclaration,
  ModifierLike,
  ParameterDeclaration,
  PropertyName,
  Token,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createMethodDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  asteriskToken: Token | undefined,
  name: string | PropertyName,
  questionToken: Token | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block | undefined,
): MethodDeclaration =>
  make("MethodDeclaration", {
    modifiers,
    asteriskToken,
    name: asPropertyName(name),
    questionToken,
    typeParameters,
    parameters,
    type,
    body,
  });
