import type { SyntaxKind } from "../../syntax";
import type { Expression } from "./Expression";

export interface PrefixUnaryExpression {
  kind: "PrefixUnaryExpression";
  operator: SyntaxKind;
  operand: Expression;
}
