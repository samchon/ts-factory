import type { Node } from "../Node";
import type { EntityName } from "./EntityName";
import type { Identifier } from "./Identifier";

export interface QualifiedName extends Node {
  kind: "QualifiedName";
  left: EntityName;
  right: Identifier;
}
