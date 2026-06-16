import type { Expression } from "./Expression";

export interface SpreadAssignment {
  kind: "SpreadAssignment";
  expression: Expression;
}
