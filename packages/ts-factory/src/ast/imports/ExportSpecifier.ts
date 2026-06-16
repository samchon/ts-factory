import type { Identifier } from "../names/Identifier";

export interface ExportSpecifier {
  kind: "ExportSpecifier";
  isTypeOnly: boolean;
  propertyName?: Identifier;
  name: Identifier;
}
