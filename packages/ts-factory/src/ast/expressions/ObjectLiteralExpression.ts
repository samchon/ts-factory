import type { ObjectLiteralElement } from "./ObjectLiteralElement";

export interface ObjectLiteralExpression {
  kind: "ObjectLiteralExpression";
  properties: readonly ObjectLiteralElement[];
  multiLine?: boolean;
}
