import type { Identifier } from "../names/Identifier";

export interface NamespaceImport {
  kind: "NamespaceImport";
  name: Identifier;
}
