import type { TypeNode, UnionTypeNode } from "../../ast";
import { make } from "../internal/make";

export const createUnionTypeNode = (
  types: readonly TypeNode[],
): UnionTypeNode => make("UnionTypeNode", { types });
