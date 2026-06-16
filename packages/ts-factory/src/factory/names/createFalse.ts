import type { Token } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { createToken } from "./createToken";

export const createFalse = (): Token => createToken(SyntaxKind.FalseKeyword);
