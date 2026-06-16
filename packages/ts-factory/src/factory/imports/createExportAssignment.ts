import type { ExportAssignment, Expression, ModifierLike } from "../../ast";
import { make } from "../internal/make";

export const createExportAssignment = (
  modifiers: readonly ModifierLike[] | undefined,
  isExportEquals: boolean | undefined,
  expression: Expression,
): ExportAssignment =>
  make("ExportAssignment", { modifiers, isExportEquals, expression });
