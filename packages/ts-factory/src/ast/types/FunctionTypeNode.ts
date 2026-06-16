import type { ParameterDeclaration } from "../clauses/ParameterDeclaration";
import type { TypeNode } from "./TypeNode";
import type { TypeParameterDeclaration } from "./TypeParameterDeclaration";

export interface FunctionTypeNode {
  kind: "FunctionTypeNode";
  typeParameters?: readonly TypeParameterDeclaration[];
  parameters: readonly ParameterDeclaration[];
  type: TypeNode;
}
