import type { ImportSpecifier, NamedImports } from "../../ast";
import { make } from "../internal/make";

export const createNamedImports = (
  elements: readonly ImportSpecifier[],
): NamedImports => make("NamedImports", { elements });
