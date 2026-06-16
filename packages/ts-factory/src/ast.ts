import { SyntaxKind } from "./syntax";

/**
 * Outline AST types produced by {@link factory} and consumed by
 * {@link TsFactoryPrinter}.
 *
 * These are intentionally _outline_ (개괄적) types — a structural skeleton of the
 * legacy TypeScript AST that is just rich enough to drive the printer. Each
 * node carries a string `kind` discriminant and whatever fields it needs.
 * Category marker interfaces (`Expression`, `Statement`, `TypeNode`, ...) exist
 * so factory methods can express the same shape of contract as the legacy
 * compiler without re-declaring the entire `ts.Node` hierarchy.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface Node {
  kind: string;
}

/* category markers ---------------------------------------------------------- */
export interface Expression extends Node {}
export interface UnaryExpression extends Expression {}
export interface Statement extends Node {}
export interface Declaration extends Statement {}
export interface TypeNode extends Node {}
export interface TypeElement extends Node {}
export interface ClassElement extends Node {}
export interface ObjectLiteralElement extends Node {}

/* names & tokens ------------------------------------------------------------ */
export interface Identifier extends Expression {
  kind: "Identifier";
  text: string;
}
export interface PrivateIdentifier extends Node {
  kind: "PrivateIdentifier";
  text: string;
}
export interface QualifiedName extends Node {
  kind: "QualifiedName";
  left: EntityName;
  right: Identifier;
}
export interface Token<TKind extends SyntaxKind = SyntaxKind> extends Node {
  kind: "Token";
  token: TKind;
}
export type EntityName = Identifier | QualifiedName;
export type PropertyName =
  | Identifier
  | StringLiteral
  | NumericLiteral
  | PrivateIdentifier;
export type Modifier = Token;
export type ModifierLike = Modifier | Decorator;
export interface Decorator extends Node {
  kind: "Decorator";
  expression: Expression;
}

/* literals ------------------------------------------------------------------ */
export interface StringLiteral extends Expression {
  kind: "StringLiteral";
  text: string;
  singleQuote?: boolean;
}
export interface NumericLiteral extends Expression {
  kind: "NumericLiteral";
  text: string;
}
export interface BigIntLiteral extends Expression {
  kind: "BigIntLiteral";
  text: string;
}

/* expressions --------------------------------------------------------------- */
export interface ArrayLiteralExpression extends Expression {}
export interface ObjectLiteralExpression extends Expression {}
export interface PropertyAssignment extends ObjectLiteralElement {}
export interface ShorthandPropertyAssignment extends ObjectLiteralElement {}
export interface SpreadAssignment extends ObjectLiteralElement {}
export interface PropertyAccessExpression extends Expression {}
export interface ElementAccessExpression extends Expression {}
export interface CallExpression extends Expression {}
export interface NewExpression extends Expression {}
export interface ParenthesizedExpression extends Expression {}
export interface BinaryExpression extends Expression {}
export interface PrefixUnaryExpression extends UnaryExpression {}
export interface PostfixUnaryExpression extends UnaryExpression {}
export interface ConditionalExpression extends Expression {}
export interface ArrowFunction extends Expression {}
export interface FunctionExpression extends Expression {}
export interface AsExpression extends Expression {}
export interface SatisfiesExpression extends Expression {}
export interface NonNullExpression extends Expression {}
export interface SpreadElement extends Expression {}
export interface AwaitExpression extends Expression {}
export interface TypeOfExpression extends Expression {}

/* types --------------------------------------------------------------------- */
export interface KeywordTypeNode extends TypeNode {}
export interface TypeReferenceNode extends TypeNode {}
export interface ArrayTypeNode extends TypeNode {}
export interface UnionTypeNode extends TypeNode {}
export interface IntersectionTypeNode extends TypeNode {}
export interface LiteralTypeNode extends TypeNode {}
export interface TypeLiteralNode extends TypeNode {}
export interface FunctionTypeNode extends TypeNode {}
export interface TupleTypeNode extends TypeNode {}
export interface ParenthesizedTypeNode extends TypeNode {}
export interface TypeOperatorNode extends TypeNode {}
export interface IndexedAccessTypeNode extends TypeNode {}
export interface TypeQueryNode extends TypeNode {}
export interface ExpressionWithTypeArguments extends Node {}
export interface PropertySignature extends TypeElement {}
export interface IndexSignatureDeclaration extends TypeElement {}
export interface MethodSignature extends TypeElement {}
export interface TypeParameterDeclaration extends Node {}

/* support ------------------------------------------------------------------- */
export interface ParameterDeclaration extends Node {}
export interface HeritageClause extends Node {}

/* statements ---------------------------------------------------------------- */
export interface VariableStatement extends Statement {}
export interface VariableDeclarationList extends Node {}
export interface VariableDeclaration extends Node {}
export interface ExpressionStatement extends Statement {}
export interface ReturnStatement extends Statement {}
export interface ThrowStatement extends Statement {}
export interface IfStatement extends Statement {}
export interface Block extends Statement {}

/* declarations -------------------------------------------------------------- */
export interface FunctionDeclaration extends Declaration {}
export interface ClassDeclaration extends Declaration {}
export interface PropertyDeclaration extends ClassElement {}
export interface MethodDeclaration extends ClassElement {}
export interface ConstructorDeclaration extends ClassElement {}
export interface GetAccessorDeclaration extends ClassElement {}
export interface SetAccessorDeclaration extends ClassElement {}
export interface InterfaceDeclaration extends Declaration {}
export interface TypeAliasDeclaration extends Declaration {}
export interface EnumDeclaration extends Declaration {}
export interface EnumMember extends Node {}

/* imports & exports --------------------------------------------------------- */
export interface ImportDeclaration extends Statement {}
export interface ImportClause extends Node {}
export interface NamedImports extends Node {}
export interface ImportSpecifier extends Node {}
export interface NamespaceImport extends Node {}
export interface ExportDeclaration extends Statement {}
export interface NamedExports extends Node {}
export interface ExportSpecifier extends Node {}
export interface ExportAssignment extends Statement {}

/* source file --------------------------------------------------------------- */
export interface SourceFile extends Node {
  kind: "SourceFile";
  statements: readonly Statement[];
}
