import type { ExpressionWithTypeArguments, HeritageClause } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createHeritageClause = (
  token: SyntaxKind,
  types: readonly ExpressionWithTypeArguments[],
): HeritageClause => make("HeritageClause", { token, types });
