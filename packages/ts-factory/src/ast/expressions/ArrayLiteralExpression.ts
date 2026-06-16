import type { Expression } from "./Expression";

export interface ArrayLiteralExpression {
  kind: "ArrayLiteralExpression";
  elements: readonly Expression[];
  multiLine?: boolean;
}
