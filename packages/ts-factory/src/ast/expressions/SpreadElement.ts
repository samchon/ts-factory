import type { Expression } from "./Expression";

export interface SpreadElement {
  kind: "SpreadElement";
  expression: Expression;
}
