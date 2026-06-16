import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { PropertyName } from "../names/PropertyName";
import type { Block } from "../statements/Block";
import type { TypeNode } from "../types/TypeNode";

export interface GetAccessorDeclaration {
  kind: "GetAccessorDeclaration";
  modifiers?: readonly ModifierLike[];
  name: PropertyName;
  parameters: readonly ParameterDeclaration[];
  type?: TypeNode;
  body?: Block;
}
