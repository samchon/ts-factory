import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { ModifierLike } from "../names/ModifierLike";
import type { TypeNode } from "./TypeNode";

export interface IndexSignatureDeclaration {
  kind: "IndexSignature";
  modifiers?: readonly ModifierLike[];
  parameters: readonly ParameterDeclaration[];
  type: TypeNode;
}
