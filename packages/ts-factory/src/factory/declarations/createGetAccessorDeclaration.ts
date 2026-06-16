import type {
  Block,
  GetAccessorDeclaration,
  ModifierLike,
  ParameterDeclaration,
  PropertyName,
  TypeNode,
} from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createGetAccessorDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block | undefined,
): GetAccessorDeclaration =>
  make("GetAccessorDeclaration", {
    modifiers,
    name: asPropertyName(name),
    parameters,
    type,
    body,
  });
