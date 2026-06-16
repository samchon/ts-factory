import type { Identifier } from "../names/Identifier";
import type { ModifierLike } from "../names/ModifierLike";
import type { EnumMember } from "./EnumMember";

export interface EnumDeclaration {
  kind: "EnumDeclaration";
  modifiers?: readonly ModifierLike[];
  name: Identifier;
  members: readonly EnumMember[];
}
