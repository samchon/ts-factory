import type { SyntaxKind } from "../../syntax";
import type { Expression } from "./Expression";

export interface BinaryExpression {
  kind: "BinaryExpression";
  left: Expression;
  operator: SyntaxKind;
  right: Expression;
}
