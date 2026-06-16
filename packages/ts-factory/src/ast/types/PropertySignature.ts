import type { ModifierLike } from "../names/ModifierLike";
import type { PropertyName } from "../names/PropertyName";
import type { Token } from "../names/Token";
import type { TypeNode } from "./TypeNode";

export interface PropertySignature {
  kind: "PropertySignature";
  modifiers?: readonly ModifierLike[];
  name: PropertyName;
  questionToken?: Token;
  type?: TypeNode;
}
