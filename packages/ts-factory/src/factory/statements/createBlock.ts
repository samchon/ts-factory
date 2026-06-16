import type { Block, Statement } from "../../ast";
import { make } from "../internal/make";

export const createBlock = (
  statements: readonly Statement[],
  multiLine?: boolean,
): Block => make("Block", { statements, multiLine: multiLine ?? true });
