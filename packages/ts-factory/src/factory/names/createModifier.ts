import type { Token } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { createToken } from "./createToken";

export const createModifier = <TKind extends SyntaxKind>(
  kind: TKind,
): Token<TKind> => createToken(kind);
