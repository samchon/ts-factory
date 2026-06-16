import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { PropertyName } from "../names/PropertyName";
import type { Token } from "../names/Token";
import type { TypeNode } from "./TypeNode";
import type { TypeParameterDeclaration } from "./TypeParameterDeclaration";

export interface MethodSignature {
  kind: "MethodSignature";
  modifiers?: readonly ModifierLike[];
  name: PropertyName;
  questionToken?: Token;
  typeParameters?: readonly TypeParameterDeclaration[];
  parameters: readonly ParameterDeclaration[];
  type?: TypeNode;
}
