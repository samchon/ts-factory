import type { SyntaxKind } from "../../syntax";
import type { Node } from "../Node";

export interface Token<TKind extends SyntaxKind = SyntaxKind> extends Node {
  kind: "Token";
  token: TKind;
}
