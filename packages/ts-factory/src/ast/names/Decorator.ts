import type { Expression } from "../expressions/Expression";

export interface Decorator {
  kind: "Decorator";
  expression: Expression;
}
