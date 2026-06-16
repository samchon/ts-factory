import type { Identifier } from "../names/Identifier";
import type { Expression } from "./Expression";

export interface ShorthandPropertyAssignment {
  kind: "ShorthandPropertyAssignment";
  name: Identifier;
  objectAssignmentInitializer?: Expression;
}
