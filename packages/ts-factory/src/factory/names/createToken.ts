import type { Token } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createToken = <TKind extends SyntaxKind>(
  token: TKind,
): Token<TKind> => make("Token", { token });
