import type { EntityName, Identifier, QualifiedName } from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createQualifiedName = (
  left: EntityName,
  right: string | Identifier,
): QualifiedName =>
  make("QualifiedName", { left, right: asName(right) as Identifier });
