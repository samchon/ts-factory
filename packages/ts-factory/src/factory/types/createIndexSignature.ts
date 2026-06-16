import type {
  IndexSignatureDeclaration,
  ModifierLike,
  ParameterDeclaration,
  TypeNode,
} from "../../ast";
import { make } from "../internal/make";

export const createIndexSignature = (
  modifiers: readonly ModifierLike[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode,
): IndexSignatureDeclaration =>
  make("IndexSignature", { modifiers, parameters, type });
