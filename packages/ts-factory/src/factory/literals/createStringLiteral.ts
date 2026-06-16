import type { StringLiteral } from "../../ast";
import { make } from "../internal/make";

export const createStringLiteral = (
  text: string,
  isSingleQuote?: boolean,
): StringLiteral => make("StringLiteral", { text, singleQuote: isSingleQuote });
