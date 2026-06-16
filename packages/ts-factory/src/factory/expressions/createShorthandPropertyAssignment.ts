import type {
  Expression,
  Identifier,
  ShorthandPropertyAssignment,
} from "../../ast";
import { asName } from "../internal/asName";
import { make } from "../internal/make";

export const createShorthandPropertyAssignment = (
  name: string | Identifier,
  objectAssignmentInitializer?: Expression,
): ShorthandPropertyAssignment =>
  make("ShorthandPropertyAssignment", {
    name: asName(name),
    objectAssignmentInitializer,
  });
