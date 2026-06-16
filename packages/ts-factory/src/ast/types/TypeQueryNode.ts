import type { EntityName } from "../names/EntityName";

export interface TypeQueryNode {
  kind: "TypeQueryNode";
  exprName: EntityName;
}
