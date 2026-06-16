import type { Node } from "../Node";
import type { Statement } from "../statements/Statement";

export interface SourceFile extends Node {
  kind: "SourceFile";
  statements: readonly Statement[];
}
