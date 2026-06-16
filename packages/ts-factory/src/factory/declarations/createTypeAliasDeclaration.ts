import type {
  Identifier,
  ModifierLike,
  TypeAliasDeclaration,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createTypeAliasDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  type: TypeNode,
): TypeAliasDeclaration =>
  make("TypeAliasDeclaration", {
    modifiers,
    name: asName(name),
    typeParameters,
    type,
  });
