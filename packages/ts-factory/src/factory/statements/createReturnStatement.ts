import type { Expression, ReturnStatement } from "../../ast";
import { make } from "../internal/make";

export const createReturnStatement = (
  expression?: Expression,
): ReturnStatement => make("ReturnStatement", { expression });
