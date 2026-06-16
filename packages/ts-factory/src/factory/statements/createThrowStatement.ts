import type { Expression, ThrowStatement } from "../../ast";
import { make } from "../internal/make";

export const createThrowStatement = (expression: Expression): ThrowStatement =>
  make("ThrowStatement", { expression });
