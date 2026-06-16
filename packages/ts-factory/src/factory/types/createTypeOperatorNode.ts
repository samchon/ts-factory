import type { TypeNode, TypeOperatorNode } from "../../ast";
import { SyntaxKind } from "../../syntax";
import { make } from "../internal/make";

export const createTypeOperatorNode = (
  operator: SyntaxKind,
  type: TypeNode,
): TypeOperatorNode => make("TypeOperatorNode", { operator, type });
