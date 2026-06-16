import type { Expression } from "../expressions/Expression";
import type { ModifierLike } from "../names/ModifierLike";

export interface ExportAssignment {
  kind: "ExportAssignment";
  modifiers?: readonly ModifierLike[];
  isExportEquals?: boolean;
  expression: Expression;
}
