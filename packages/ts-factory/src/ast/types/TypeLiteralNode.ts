import type { TypeElement } from "./TypeElement";

export interface TypeLiteralNode {
  kind: "TypeLiteralNode";
  members: readonly TypeElement[];
}
