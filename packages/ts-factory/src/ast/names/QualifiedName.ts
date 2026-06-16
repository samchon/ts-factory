import type { EntityName } from "./EntityName";
import type { Identifier } from "./Identifier";

export interface QualifiedName {
  kind: "QualifiedName";
  left: EntityName;
  right: Identifier;
}
