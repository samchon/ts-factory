import type { SourceFile, Statement } from "../../ast";
import { createSourceFile } from "./createSourceFile";

export const updateSourceFile = (
  _source: SourceFile,
  statements: readonly Statement[],
): SourceFile => createSourceFile(statements);
