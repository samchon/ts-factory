import type {
  Expression,
  ModifierLike,
  PropertyDeclaration,
  PropertyName,
  Token,
  TypeNode,
} from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createPropertyDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  questionOrExclamationToken: Token | undefined,
  type: TypeNode | undefined,
  initializer: Expression | undefined,
): PropertyDeclaration =>
  make("PropertyDeclaration", {
    modifiers,
    name: asPropertyName(name),
    questionOrExclamationToken,
    type,
    initializer,
  });
