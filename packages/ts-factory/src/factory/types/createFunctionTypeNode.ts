import type {
  FunctionTypeNode,
  ParameterDeclaration,
  TypeNode,
  TypeParameterDeclaration,
} from "../../ast";
import { make } from "../internal/make";

export const createFunctionTypeNode = (
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode,
): FunctionTypeNode =>
  make("FunctionTypeNode", { typeParameters, parameters, type });
