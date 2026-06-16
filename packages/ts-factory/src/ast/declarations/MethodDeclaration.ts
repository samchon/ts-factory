import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { PropertyName } from "../names/PropertyName";
import type { Token } from "../names/Token";
import type { Block } from "../statements/Block";
import type { TypeNode } from "../types/TypeNode";
import type { TypeParameterDeclaration } from "../types/TypeParameterDeclaration";

export interface MethodDeclaration {
  kind: "MethodDeclaration";
  modifiers?: readonly ModifierLike[];
  asteriskToken?: Token;
  name: PropertyName;
  questionToken?: Token;
  typeParameters?: readonly TypeParameterDeclaration[];
  parameters: readonly ParameterDeclaration[];
  type?: TypeNode;
  body?: Block;
}
