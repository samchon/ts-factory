import type { Expression } from "../expressions/Expression";
import type { ModifierLike } from "../names/ModifierLike";
import type { PropertyName } from "../names/PropertyName";
import type { Token } from "../names/Token";
import type { TypeNode } from "../types/TypeNode";

export interface PropertyDeclaration {
  kind: "PropertyDeclaration";
  modifiers?: readonly ModifierLike[];
  name: PropertyName;
  questionOrExclamationToken?: Token;
  type?: TypeNode;
  initializer?: Expression;
}
