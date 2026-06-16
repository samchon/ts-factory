import type { SourceFile, Statement } from "../../ast";
import { make } from "../internal/make";

export const createSourceFile = (
  statements: readonly Statement[],
): SourceFile => make("SourceFile", { statements });
