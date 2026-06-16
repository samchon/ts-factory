import type { Identifier } from "../names/Identifier";

export interface ImportSpecifier {
  kind: "ImportSpecifier";
  isTypeOnly: boolean;
  propertyName?: Identifier;
  name: Identifier;
}
