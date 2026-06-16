import type {
  EnumDeclaration,
  EnumMember,
  Identifier,
  ModifierLike,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createEnumDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  members: readonly EnumMember[],
): EnumDeclaration =>
  make("EnumDeclaration", { modifiers, name: asName(name), members });
