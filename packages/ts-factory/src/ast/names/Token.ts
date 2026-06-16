import type { SyntaxKind } from "../../syntax";

export interface Token<TKind extends SyntaxKind = SyntaxKind> {
  kind: "Token";
  token: TKind;
}
