import type {
  Block,
  ModifierLike,
  ParameterDeclaration,
  PropertyName,
  SetAccessorDeclaration,
} from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createSetAccessorDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  parameters: readonly ParameterDeclaration[],
  body: Block | undefined,
): SetAccessorDeclaration =>
  make("SetAccessorDeclaration", {
    modifiers,
    name: asPropertyName(name),
    parameters,
    body,
  });
