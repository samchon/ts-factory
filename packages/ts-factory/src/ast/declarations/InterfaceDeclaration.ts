import type { HeritageClause } from "../clauses/HeritageClause";
import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { TypeElement } from "../types/TypeElement";
import type { TypeParameterDeclaration } from "../types/TypeParameterDeclaration";

export interface InterfaceDeclaration {
  kind: "InterfaceDeclaration";
  modifiers?: readonly ModifierLike[];
  name: Identifier;
  typeParameters?: readonly TypeParameterDeclaration[];
  heritageClauses?: readonly HeritageClause[];
  members: readonly TypeElement[];
}
