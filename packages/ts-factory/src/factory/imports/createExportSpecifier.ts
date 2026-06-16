import type { ExportSpecifier, Identifier } from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createExportSpecifier = (
  isTypeOnly: boolean,
  propertyName: string | Identifier | undefined,
  name: string | Identifier,
): ExportSpecifier =>
  make("ExportSpecifier", {
    isTypeOnly,
    propertyName: propertyName === undefined ? undefined : asName(propertyName),
    name: asName(name),
  });
