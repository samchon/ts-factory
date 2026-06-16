import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { TypeNode } from "./TypeNode";

export interface TypeParameterDeclaration {
  kind: "TypeParameterDeclaration";
  modifiers?: readonly ModifierLike[];
  name: Identifier;
  constraint?: TypeNode;
  default?: TypeNode;
}
