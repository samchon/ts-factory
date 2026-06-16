import type { SyntaxKind } from "../../syntax";
import type { Expression } from "./Expression";

export interface PostfixUnaryExpression {
  kind: "PostfixUnaryExpression";
  operand: Expression;
  operator: SyntaxKind;
}
