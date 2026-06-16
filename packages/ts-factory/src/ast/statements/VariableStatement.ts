import type { ModifierLike } from "../names/ModifierLike";
import type { VariableDeclarationList } from "./VariableDeclarationList";

export interface VariableStatement {
  kind: "VariableStatement";
  modifiers?: readonly ModifierLike[];
  declarationList: VariableDeclarationList;
}
