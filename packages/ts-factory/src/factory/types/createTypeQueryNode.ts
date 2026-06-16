import type { EntityName, TypeQueryNode } from "../../ast";
import { make } from "../internal/make";

export const createTypeQueryNode = (exprName: EntityName): TypeQueryNode =>
  make("TypeQueryNode", { exprName });
