import type { ParenthesizedTypeNode, TypeNode } from "../../ast";
import { make } from "../internal/make";

export const createParenthesizedType = (
  type: TypeNode,
): ParenthesizedTypeNode => make("ParenthesizedTypeNode", { type });
