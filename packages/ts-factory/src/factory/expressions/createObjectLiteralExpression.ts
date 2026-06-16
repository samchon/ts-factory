import type { ObjectLiteralElement, ObjectLiteralExpression } from "../../ast";
import { make } from "../internal/make";

export const createObjectLiteralExpression = (
  properties: readonly ObjectLiteralElement[] = [],
  multiLine?: boolean,
): ObjectLiteralExpression =>
  make("ObjectLiteralExpression", { properties, multiLine });
