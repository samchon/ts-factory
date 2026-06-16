import type { Node } from "../Node";
import type { Expression } from "../expressions/Expression";

export interface Decorator extends Node {
  kind: "Decorator";
  expression: Expression;
}
