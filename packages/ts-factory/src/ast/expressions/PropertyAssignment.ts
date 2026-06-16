import type { PropertyName } from "../names/PropertyName";
import type { Expression } from "./Expression";

export interface PropertyAssignment {
  kind: "PropertyAssignment";
  name: PropertyName;
  initializer: Expression;
}
