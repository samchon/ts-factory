import type {
  ExportDeclaration,
  Expression,
  ModifierLike,
  NamedExports,
  NamespaceImport,
} from "../../ast";
import { make } from "../internal/make";
import { createStringLiteral } from "../literals/createStringLiteral";

export const createExportDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  isTypeOnly: boolean,
  exportClause: NamedExports | NamespaceImport | undefined,
  moduleSpecifier?: Expression | string,
): ExportDeclaration =>
  make("ExportDeclaration", {
    modifiers,
    isTypeOnly,
    exportClause,
    moduleSpecifier:
      typeof moduleSpecifier === "string"
        ? createStringLiteral(moduleSpecifier)
        : moduleSpecifier,
  });
