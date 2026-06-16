import type { Token } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { createToken } from "./createToken";

export const createNull = (): Token => createToken(SyntaxKind.NullKeyword);
