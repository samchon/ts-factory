import type { PropertyAssignment } from "./PropertyAssignment";
import type { ShorthandPropertyAssignment } from "./ShorthandPropertyAssignment";
import type { SpreadAssignment } from "./SpreadAssignment";

export type ObjectLiteralElement =
  | PropertyAssignment
  | ShorthandPropertyAssignment
  | SpreadAssignment;
