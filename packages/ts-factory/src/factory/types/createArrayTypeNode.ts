import type { ArrayTypeNode, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createArrayTypeNode = (elementType: TypeNode): ArrayTypeNode =>
  make("ArrayTypeNode", { elementType });
