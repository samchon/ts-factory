import type { KeywordTypeNode } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createKeywordTypeNode = (kind: SyntaxKind): KeywordTypeNode =>
  make("KeywordTypeNode", { keyword: kind });
