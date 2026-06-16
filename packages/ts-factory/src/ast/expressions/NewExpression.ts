import type { TypeNode } from "../types/TypeNode";
import type { Expression } from "./Expression";

export interface NewExpression {
  kind: "NewExpression";
  expression: Expression;
  typeArguments?: readonly TypeNode[];
  arguments?: readonly Expression[];
}
