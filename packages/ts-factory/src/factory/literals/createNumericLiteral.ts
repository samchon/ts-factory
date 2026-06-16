import type { NumericLiteral } from "../../ast";
import { make } from "../internal/make";

export const createNumericLiteral = (value: string | number): NumericLiteral =>
  make("NumericLiteral", { text: String(value) });
