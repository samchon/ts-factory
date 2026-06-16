import type { Identifier, ImportSpecifier } from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createImportSpecifier = (
  isTypeOnly: boolean,
  propertyName: Identifier | undefined,
  name: string | Identifier,
): ImportSpecifier =>
  make("ImportSpecifier", { isTypeOnly, propertyName, name: asName(name) });
