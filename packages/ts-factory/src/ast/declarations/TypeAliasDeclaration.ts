import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { TypeNode } from "../types/TypeNode";
import type { TypeParameterDeclaration } from "../types/TypeParameterDeclaration";

export interface TypeAliasDeclaration {
  kind: "TypeAliasDeclaration";
  modifiers?: readonly ModifierLike[];
  name: Identifier;
  typeParameters?: readonly TypeParameterDeclaration[];
  type: TypeNode;
}
