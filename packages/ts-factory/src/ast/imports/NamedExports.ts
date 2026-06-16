import type { ExportSpecifier } from "./ExportSpecifier";

export interface NamedExports {
  kind: "NamedExports";
  elements: readonly ExportSpecifier[];
}
