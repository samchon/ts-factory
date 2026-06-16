import type { SyntaxKind } from "../../syntax";
import type { ExpressionWithTypeArguments } from "../types/ExpressionWithTypeArguments";

export interface HeritageClause {
  kind: "HeritageClause";
  token: SyntaxKind;
  types: readonly ExpressionWithTypeArguments[];
}
