import type { HeritageClause } from "../clauses/HeritageClause";
import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { TypeParameterDeclaration } from "../types/TypeParameterDeclaration";
import type { ClassElement } from "./ClassElement";

export interface ClassDeclaration {
  kind: "ClassDeclaration";
  modifiers?: readonly ModifierLike[];
  name?: Identifier;
  typeParameters?: readonly TypeParameterDeclaration[];
  heritageClauses?: readonly HeritageClause[];
  members: readonly ClassElement[];
}
