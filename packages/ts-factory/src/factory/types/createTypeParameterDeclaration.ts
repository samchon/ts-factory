import type {
  Identifier,
  ModifierLike,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createTypeParameterDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  constraint?: TypeNode,
  defaultType?: TypeNode,
): TypeParameterDeclaration =>
  make("TypeParameterDeclaration", {
    modifiers,
    name: asName(name),
    constraint,
    default: defaultType,
  });
