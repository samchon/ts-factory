import type { Identifier } from "../names/Identifier";
import type { NamedImports } from "./NamedImports";
import type { NamespaceImport } from "./NamespaceImport";

export interface ImportClause {
  kind: "ImportClause";
  isTypeOnly: boolean;
  name?: Identifier;
  namedBindings?: NamedImports | NamespaceImport;
}
