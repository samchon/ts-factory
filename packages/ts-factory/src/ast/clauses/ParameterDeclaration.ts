import type { Expression } from "../expressions/Expression";
import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { Token } from "../names/Token";
import type { TypeNode } from "../types/TypeNode";

export interface ParameterDeclaration {
  kind: "ParameterDeclaration";
  modifiers?: readonly ModifierLike[];
  dotDotDotToken?: Token;
  name: Identifier;
  questionToken?: Token;
  type?: TypeNode;
  initializer?: Expression;
}
