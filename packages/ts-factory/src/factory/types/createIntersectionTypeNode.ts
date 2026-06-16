import type { IntersectionTypeNode, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createIntersectionTypeNode = (
  types: readonly TypeNode[],
): IntersectionTypeNode => make("IntersectionTypeNode", { types });
