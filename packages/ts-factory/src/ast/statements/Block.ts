import type { Statement } from "./Statement";

export interface Block {
  kind: "Block";
  statements: readonly Statement[];
  multiLine?: boolean;
}
