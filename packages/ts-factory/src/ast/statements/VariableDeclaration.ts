import type { Expression } from "../expressions/Expression";
import type { Identifier } from "../names/Identifier";
import type { Token } from "../names/Token";
import type { TypeNode } from "../types/TypeNode";

export interface VariableDeclaration {
  kind: "VariableDeclaration";
  name: Identifier;
  exclamationToken?: Token;
  type?: TypeNode;
  initializer?: Expression;
}
