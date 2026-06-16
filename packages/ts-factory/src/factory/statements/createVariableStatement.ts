import type {
  ModifierLike,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
} from "../../ast";
import { make } from "../internal/make";
import { createVariableDeclarationList } from "./createVariableDeclarationList";

export const createVariableStatement = (
  modifiers: readonly ModifierLike[] | undefined,
  declarationList: VariableDeclarationList | readonly VariableDeclaration[],
): VariableStatement =>
  make("VariableStatement", {
    modifiers,
    declarationList: Array.isArray(declarationList)
      ? createVariableDeclarationList(declarationList)
      : declarationList,
  });
