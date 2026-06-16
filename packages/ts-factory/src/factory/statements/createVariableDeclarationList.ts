import type { VariableDeclaration, VariableDeclarationList } from "../../ast";
import { NodeFlags } from "../../syntax";
import { make } from "../internal/make";

export const createVariableDeclarationList = (
  declarations: readonly VariableDeclaration[],
  flags: NodeFlags = NodeFlags.None,
): VariableDeclarationList =>
  make("VariableDeclarationList", { declarations, flags });
