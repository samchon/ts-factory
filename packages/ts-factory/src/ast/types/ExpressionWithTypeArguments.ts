import type { Expression } from "../expressions/Expression";
import type { TypeNode } from "./TypeNode";

export interface ExpressionWithTypeArguments {
  kind: "ExpressionWithTypeArguments";
  expression: Expression;
  typeArguments?: readonly TypeNode[];
}
