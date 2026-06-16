import type { Identifier } from "../names/Identifier";
import type { Token } from "../names/Token";
import type { ArrayLiteralExpression } from "./ArrayLiteralExpression";
import type { ArrowFunction } from "./ArrowFunction";
import type { AsExpression } from "./AsExpression";
import type { AwaitExpression } from "./AwaitExpression";
import type { BigIntLiteral } from "./BigIntLiteral";
import type { BinaryExpression } from "./BinaryExpression";
import type { CallExpression } from "./CallExpression";
import type { ConditionalExpression } from "./ConditionalExpression";
import type { ElementAccessExpression } from "./ElementAccessExpression";
import type { FunctionExpression } from "./FunctionExpression";
import type { NewExpression } from "./NewExpression";
import type { NoSubstitutionTemplateLiteral } from "./NoSubstitutionTemplateLiteral";
import type { NonNullExpression } from "./NonNullExpression";
import type { NumericLiteral } from "./NumericLiteral";
import type { ObjectLiteralExpression } from "./ObjectLiteralExpression";
import type { ParenthesizedExpression } from "./ParenthesizedExpression";
import type { PostfixUnaryExpression } from "./PostfixUnaryExpression";
import type { PrefixUnaryExpression } from "./PrefixUnaryExpression";
import type { PropertyAccessExpression } from "./PropertyAccessExpression";
import type { SatisfiesExpression } from "./SatisfiesExpression";
import type { SpreadElement } from "./SpreadElement";
import type { StringLiteral } from "./StringLiteral";
import type { TypeOfExpression } from "./TypeOfExpression";

/**
 * Any expression node.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export type Expression =
  | ArrayLiteralExpression
  | ArrowFunction
  | AsExpression
  | AwaitExpression
  | BigIntLiteral
  | BinaryExpression
  | CallExpression
  | ConditionalExpression
  | ElementAccessExpression
  | FunctionExpression
  | Identifier
  | NewExpression
  | NoSubstitutionTemplateLiteral
  | NonNullExpression
  | NumericLiteral
  | ObjectLiteralExpression
  | ParenthesizedExpression
  | PostfixUnaryExpression
  | PrefixUnaryExpression
  | PropertyAccessExpression
  | SatisfiesExpression
  | SpreadElement
  | StringLiteral
  | Token
  | TypeOfExpression;
