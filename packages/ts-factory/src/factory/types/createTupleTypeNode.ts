import type { TupleTypeNode, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createTupleTypeNode = (
  elements: readonly TypeNode[],
): TupleTypeNode => make("TupleTypeNode", { elements });
