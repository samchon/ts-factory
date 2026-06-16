import type { Expression } from "../expressions/Expression";
import type { ModifierLike } from "../names/ModifierLike";
import type { ImportClause } from "./ImportClause";

export interface ImportDeclaration {
  kind: "ImportDeclaration";
  modifiers?: readonly ModifierLike[];
  importClause?: ImportClause;
  moduleSpecifier: Expression;
}
