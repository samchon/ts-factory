import type { TypeNode } from "../types/TypeNode";
import type { Expression } from "./Expression";

export interface CallExpression {
  kind: "CallExpression";
  expression: Expression;
  typeArguments?: readonly TypeNode[];
  arguments: readonly Expression[];
}
