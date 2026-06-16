import type {
  MethodSignature,
  ModifierLike,
  ParameterDeclaration,
  PropertyName,
  Token,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createMethodSignature = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  questionToken: Token | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
): MethodSignature =>
  make("MethodSignature", {
    modifiers,
    name: asPropertyName(name),
    questionToken,
    typeParameters,
    parameters,
    type,
  });
