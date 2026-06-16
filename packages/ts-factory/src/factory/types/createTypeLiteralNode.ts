import type { TypeElement, TypeLiteralNode } from "../../ast";
import { make } from "../internal/make";

export const createTypeLiteralNode = (
  members: readonly TypeElement[] = [],
): TypeLiteralNode => make("TypeLiteralNode", { members });
