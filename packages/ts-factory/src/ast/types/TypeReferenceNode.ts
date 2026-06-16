import type { EntityName } from "../names/EntityName";
import type { TypeNode } from "./TypeNode";

export interface TypeReferenceNode {
  kind: "TypeReferenceNode";
  typeName: EntityName;
  typeArguments?: readonly TypeNode[];
}
