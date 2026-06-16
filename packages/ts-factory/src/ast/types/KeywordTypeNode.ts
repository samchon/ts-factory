import type { SyntaxKind } from "../../syntax";

export interface KeywordTypeNode {
  kind: "KeywordTypeNode";
  keyword: SyntaxKind;
}
