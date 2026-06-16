import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { Block } from "../statements/Block";

export interface ConstructorDeclaration {
  kind: "ConstructorDeclaration";
  modifiers?: readonly ModifierLike[];
  parameters: readonly ParameterDeclaration[];
  body?: Block;
}
