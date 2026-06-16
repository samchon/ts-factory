import type { Expression, PropertyAssignment, PropertyName } from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createPropertyAssignment = (
  name: string | PropertyName,
  initializer: Expression,
): PropertyAssignment =>
  make("PropertyAssignment", { name: asPropertyName(name), initializer });
