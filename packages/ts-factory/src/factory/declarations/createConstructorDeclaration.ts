import type {
  Block,
  ConstructorDeclaration,
  ModifierLike,
  ParameterDeclaration,
} from "../../ast";
import { make } from "../internal/make";

export const createConstructorDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  parameters: readonly ParameterDeclaration[],
  body: Block | undefined,
): ConstructorDeclaration =>
  make("ConstructorDeclaration", { modifiers, parameters, body });
