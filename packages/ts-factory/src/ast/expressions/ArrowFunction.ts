import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { Block } from "../statements/Block";
import type { TypeNode } from "../types/TypeNode";
import type { TypeParameterDeclaration } from "../types/TypeParameterDeclaration";
import type { Expression } from "./Expression";

export interface ArrowFunction {
  kind: "ArrowFunction";
  modifiers?: readonly ModifierLike[];
  typeParameters?: readonly TypeParameterDeclaration[];
  parameters: readonly ParameterDeclaration[];
  type?: TypeNode;
  body: Block | Expression;
}
