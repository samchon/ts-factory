import type {
  ArrowFunction,
  Block,
  Expression,
  ModifierLike,
  ParameterDeclaration,
  Token,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { make } from "../internal/make";

export const createArrowFunction = (
  modifiers: readonly ModifierLike[] | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  _equalsGreaterThanToken: Token | undefined,
  body: Block | Expression,
): ArrowFunction =>
  make("ArrowFunction", { modifiers, typeParameters, parameters, type, body });
