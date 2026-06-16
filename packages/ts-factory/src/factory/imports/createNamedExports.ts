import type { ExportSpecifier, NamedExports } from "../../ast";
import { make } from "../internal/make";

export const createNamedExports = (
  elements: readonly ExportSpecifier[],
): NamedExports => make("NamedExports", { elements });
