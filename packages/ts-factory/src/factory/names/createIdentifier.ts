import type { Identifier } from "../../ast";
import { make } from "../internal/make";

export const createIdentifier = (text: string): Identifier =>
  make("Identifier", { text });
