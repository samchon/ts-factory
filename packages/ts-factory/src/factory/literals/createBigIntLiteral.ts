import type { BigIntLiteral } from "../../ast";
import { make } from "../internal/make";

export const createBigIntLiteral = (value: string): BigIntLiteral =>
  make("BigIntLiteral", { text: value.endsWith("n") ? value : `${value}n` });
