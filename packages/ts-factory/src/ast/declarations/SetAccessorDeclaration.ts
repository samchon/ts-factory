import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { PropertyName } from "../names/PropertyName";
import type { Block } from "../statements/Block";

export interface SetAccessorDeclaration {
  kind: "SetAccessorDeclaration";
  modifiers?: readonly ModifierLike[];
  name: PropertyName;
  parameters: readonly ParameterDeclaration[];
  body?: Block;
}
