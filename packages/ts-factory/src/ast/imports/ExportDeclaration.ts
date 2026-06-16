import type { Expression } from "../expressions/Expression";
import type { ModifierLike } from "../names/ModifierLike";
import type { NamedExports } from "./NamedExports";
import type { NamespaceImport } from "./NamespaceImport";

export interface ExportDeclaration {
  kind: "ExportDeclaration";
  modifiers?: readonly ModifierLike[];
  isTypeOnly: boolean;
  exportClause?: NamedExports | NamespaceImport;
  moduleSpecifier?: Expression;
}
