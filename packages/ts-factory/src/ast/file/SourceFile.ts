import type { Statement } from "../statements/Statement";

export interface SourceFile {
  kind: "SourceFile";
  statements: readonly Statement[];
}
