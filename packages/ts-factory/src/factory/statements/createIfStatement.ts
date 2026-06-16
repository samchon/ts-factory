import type { Expression, IfStatement, Statement } from "../../ast";
import { make } from "../internal/make";

export const createIfStatement = (
  expression: Expression,
  thenStatement: Statement,
  elseStatement?: Statement,
): IfStatement =>
  make("IfStatement", { expression, thenStatement, elseStatement });
