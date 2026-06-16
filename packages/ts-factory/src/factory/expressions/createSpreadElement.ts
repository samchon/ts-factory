import type { Expression, SpreadElement } from "../../ast";
import { make } from "../internal/make";

export const createSpreadElement = (expression: Expression): SpreadElement =>
  make("SpreadElement", { expression });
