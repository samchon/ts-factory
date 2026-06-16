import type { Expression } from "../expressions/Expression";
import type { PropertyName } from "../names/PropertyName";

export interface EnumMember {
  kind: "EnumMember";
  name: PropertyName;
  initializer?: Expression;
}
