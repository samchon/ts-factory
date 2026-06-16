import type { Expression } from "../expressions/Expression";
import type { ModifierLike } from "../names/ModifierLike";
import type { NamedExports } from "./NamedExports";
import type { NamespaceImport } from "./NamespaceImport";

/**
 * An `export` declaration.
 *
 * Built by {@link factory.createExportDeclaration}.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface ExportDeclaration {
  /** Discriminant tag; always `"ExportDeclaration"`. */
  kind: "ExportDeclaration";
  /** The leading modifiers and decorators, if any. */
  modifiers?: readonly ModifierLike[];
  /** Whether this is a type-only import/export. */
  isTypeOnly: boolean;
  /** The export clause; omitted for `export *`. */
  exportClause?: NamedExports | NamespaceImport;
  /** The module specifier (the `from` target). */
  moduleSpecifier?: Expression;
}
