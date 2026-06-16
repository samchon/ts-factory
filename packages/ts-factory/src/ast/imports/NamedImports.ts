import type { ImportSpecifier } from "./ImportSpecifier";

export interface NamedImports {
  kind: "NamedImports";
  elements: readonly ImportSpecifier[];
}
