import type {
  ModifierLike,
  PropertyName,
  PropertySignature,
  Token,
  TypeNode,
} from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createPropertySignature = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  questionToken: Token | undefined,
  type: TypeNode | undefined,
): PropertySignature =>
  make("PropertySignature", {
    modifiers,
    name: asPropertyName(name),
    questionToken,
    type,
  });
