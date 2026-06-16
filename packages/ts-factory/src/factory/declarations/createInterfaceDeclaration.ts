import type {
  HeritageClause,
  Identifier,
  InterfaceDeclaration,
  ModifierLike,
  TypeElement,
  TypeParameterDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createInterfaceDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  heritageClauses: readonly HeritageClause[] | undefined,
  members: readonly TypeElement[],
): InterfaceDeclaration =>
  make("InterfaceDeclaration", {
    modifiers,
    name: asName(name),
    typeParameters,
    heritageClauses,
    members,
  });
