import type { Token } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { createToken } from "./createToken";

export const createThis = (): Token => createToken(SyntaxKind.ThisKeyword);
