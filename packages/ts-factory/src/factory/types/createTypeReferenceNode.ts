import type { EntityName, TypeNode, TypeReferenceNode } from "../../ast";
import { asEntityName } from "../internal/asEntityName";
import { make } from "../internal/make";

export const createTypeReferenceNode = (
  typeName: string | EntityName,
  typeArguments?: readonly TypeNode[],
): TypeReferenceNode =>
  make("TypeReferenceNode", {
    typeName: asEntityName(typeName),
    typeArguments,
  });
