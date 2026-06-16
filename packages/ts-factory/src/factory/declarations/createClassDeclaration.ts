import type {
  ClassDeclaration,
  ClassElement,
  HeritageClause,
  Identifier,
  ModifierLike,
  TypeParameterDeclaration,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createClassDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  heritageClauses: readonly HeritageClause[] | undefined,
  members: readonly ClassElement[],
): ClassDeclaration =>
  make("ClassDeclaration", {
    modifiers,
    name: name === undefined ? undefined : asName(name),
    typeParameters,
    heritageClauses,
    members,
  });
