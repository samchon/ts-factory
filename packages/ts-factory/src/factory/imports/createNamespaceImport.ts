import type { Identifier, NamespaceImport } from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createNamespaceImport = (
  name: string | Identifier,
): NamespaceImport => make("NamespaceImport", { name: asName(name) });
