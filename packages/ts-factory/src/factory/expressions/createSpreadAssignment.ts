import type { Expression, SpreadAssignment } from "../../ast";
import { make } from "../internal/make";

export const createSpreadAssignment = (
  expression: Expression,
): SpreadAssignment => make("SpreadAssignment", { expression });
