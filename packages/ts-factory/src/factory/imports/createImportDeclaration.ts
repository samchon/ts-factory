import type {
  Expression,
  ImportClause,
  ImportDeclaration,
  ModifierLike,
} from "../../ast";
import { make } from "../internal/make";
import { createStringLiteral } from "../literals/createStringLiteral";

export const createImportDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  importClause: ImportClause | undefined,
  moduleSpecifier: Expression | string,
): ImportDeclaration =>
  make("ImportDeclaration", {
    modifiers,
    importClause,
    moduleSpecifier:
      typeof moduleSpecifier === "string"
        ? createStringLiteral(moduleSpecifier)
        : moduleSpecifier,
  });
