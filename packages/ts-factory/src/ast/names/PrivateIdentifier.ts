import type { Node } from "../Node";

export interface PrivateIdentifier extends Node {
  kind: "PrivateIdentifier";
  text: string;
}
