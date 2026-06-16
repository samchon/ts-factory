import type { NodeFlags } from "../../syntax";
import type { VariableDeclaration } from "./VariableDeclaration";

export interface VariableDeclarationList {
  kind: "VariableDeclarationList";
  declarations: readonly VariableDeclaration[];
  flags: NodeFlags;
}
