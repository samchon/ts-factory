import type {
  Expression,
  Identifier,
  ModifierLike,
  ParameterDeclaration,
  Token,
  TypeNode,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createParameterDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  dotDotDotToken: Token | undefined,
  name: string | Identifier,
  questionToken?: Token,
  type?: TypeNode,
  initializer?: Expression,
): ParameterDeclaration =>
  make("ParameterDeclaration", {
    modifiers,
    dotDotDotToken,
    name: asName(name),
    questionToken,
    type,
    initializer,
  });
