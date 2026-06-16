import type { IndexedAccessTypeNode, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createIndexedAccessTypeNode = (
  objectType: TypeNode,
  indexType: TypeNode,
): IndexedAccessTypeNode =>
  make("IndexedAccessTypeNode", { objectType, indexType });
