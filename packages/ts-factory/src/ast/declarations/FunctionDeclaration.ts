import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { Token } from "../names/Token";
import type { Block } from "../statements/Block";
import type { TypeNode } from "../types/TypeNode";
import type { TypeParameterDeclaration } from "../types/TypeParameterDeclaration";

export interface FunctionDeclaration {
  kind: "FunctionDeclaration";
  modifiers?: readonly ModifierLike[];
  asteriskToken?: Token;
  name?: Identifier;
  typeParameters?: readonly TypeParameterDeclaration[];
  parameters: readonly ParameterDeclaration[];
  type?: TypeNode;
  body?: Block;
}
