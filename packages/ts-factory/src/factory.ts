import type {
  ArrayLiteralExpression,
  ArrayTypeNode,
  ArrowFunction,
  AsExpression,
  AwaitExpression,
  BigIntLiteral,
  BinaryExpression,
  Block,
  CallExpression,
  ClassDeclaration,
  ClassElement,
  ConditionalExpression,
  ConstructorDeclaration,
  Decorator,
  ElementAccessExpression,
  EntityName,
  EnumDeclaration,
  EnumMember,
  ExportAssignment,
  ExportDeclaration,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  ExpressionWithTypeArguments,
  FunctionDeclaration,
  FunctionExpression,
  FunctionTypeNode,
  GetAccessorDeclaration,
  HeritageClause,
  Identifier,
  IfStatement,
  ImportClause,
  ImportDeclaration,
  ImportSpecifier,
  IndexSignatureDeclaration,
  IndexedAccessTypeNode,
  InterfaceDeclaration,
  IntersectionTypeNode,
  KeywordTypeNode,
  LiteralTypeNode,
  MethodDeclaration,
  MethodSignature,
  ModifierLike,
  NamedExports,
  NamedImports,
  NamespaceImport,
  NewExpression,
  Node,
  NonNullExpression,
  NumericLiteral,
  ObjectLiteralElement,
  ObjectLiteralExpression,
  ParameterDeclaration,
  ParenthesizedExpression,
  ParenthesizedTypeNode,
  PostfixUnaryExpression,
  PrefixUnaryExpression,
  PrivateIdentifier,
  PropertyAccessExpression,
  PropertyAssignment,
  PropertyDeclaration,
  PropertyName,
  PropertySignature,
  QualifiedName,
  ReturnStatement,
  SatisfiesExpression,
  SetAccessorDeclaration,
  ShorthandPropertyAssignment,
  SourceFile,
  SpreadAssignment,
  SpreadElement,
  Statement,
  StringLiteral,
  ThrowStatement,
  Token,
  TupleTypeNode,
  TypeAliasDeclaration,
  TypeElement,
  TypeLiteralNode,
  TypeNode,
  TypeOfExpression,
  TypeOperatorNode,
  TypeParameterDeclaration,
  TypeQueryNode,
  TypeReferenceNode,
  UnionTypeNode,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
} from "./ast";
import { NodeFlags, SyntaxKind } from "./syntax";

// eslint-disable-next-line
const make = (kind: string, props: object = {}): any => ({ kind, ...props });

const asName = (name: string | PropertyName): PropertyName =>
  typeof name === "string" ? createIdentifier(name) : name;
const asEntityName = (name: string | EntityName): EntityName =>
  typeof name === "string" ? createIdentifier(name) : name;
const asPropertyName = (name: string | PropertyName): PropertyName =>
  typeof name === "string" ? createIdentifier(name) : name;

/* names & tokens ------------------------------------------------------------ */
const createIdentifier = (text: string): Identifier =>
  make("Identifier", { text });
const createPrivateIdentifier = (text: string): PrivateIdentifier =>
  make("PrivateIdentifier", { text: text.startsWith("#") ? text : `#${text}` });
const createQualifiedName = (
  left: EntityName,
  right: string | Identifier,
): QualifiedName =>
  make("QualifiedName", { left, right: asName(right) as Identifier });
const createToken = <TKind extends SyntaxKind>(token: TKind): Token<TKind> =>
  make("Token", { token });
const createModifier = <TKind extends SyntaxKind>(kind: TKind): Token<TKind> =>
  createToken(kind);
const createDecorator = (expression: Expression): Decorator =>
  make("Decorator", { expression });

const createTrue = (): Token => createToken(SyntaxKind.TrueKeyword);
const createFalse = (): Token => createToken(SyntaxKind.FalseKeyword);
const createNull = (): Token => createToken(SyntaxKind.NullKeyword);
const createThis = (): Token => createToken(SyntaxKind.ThisKeyword);

/* literals ------------------------------------------------------------------ */
const createStringLiteral = (
  text: string,
  isSingleQuote?: boolean,
): StringLiteral => make("StringLiteral", { text, singleQuote: isSingleQuote });
const createNumericLiteral = (value: string | number): NumericLiteral =>
  make("NumericLiteral", { text: String(value) });
const createBigIntLiteral = (value: string): BigIntLiteral =>
  make("BigIntLiteral", { text: value.endsWith("n") ? value : `${value}n` });

/* expressions --------------------------------------------------------------- */
const createArrayLiteralExpression = (
  elements: readonly Expression[] = [],
  multiLine?: boolean,
): ArrayLiteralExpression =>
  make("ArrayLiteralExpression", { elements, multiLine });
const createObjectLiteralExpression = (
  properties: readonly ObjectLiteralElement[] = [],
  multiLine?: boolean,
): ObjectLiteralExpression =>
  make("ObjectLiteralExpression", { properties, multiLine });
const createPropertyAssignment = (
  name: string | PropertyName,
  initializer: Expression,
): PropertyAssignment =>
  make("PropertyAssignment", { name: asPropertyName(name), initializer });
const createShorthandPropertyAssignment = (
  name: string | Identifier,
  objectAssignmentInitializer?: Expression,
): ShorthandPropertyAssignment =>
  make("ShorthandPropertyAssignment", {
    name: asName(name),
    objectAssignmentInitializer,
  });
const createSpreadAssignment = (expression: Expression): SpreadAssignment =>
  make("SpreadAssignment", { expression });
const createPropertyAccessExpression = (
  expression: Expression,
  name: string | Identifier | PrivateIdentifier,
): PropertyAccessExpression =>
  make("PropertyAccessExpression", {
    expression,
    name: typeof name === "string" ? createIdentifier(name) : name,
  });
const createElementAccessExpression = (
  expression: Expression,
  index: number | Expression,
): ElementAccessExpression =>
  make("ElementAccessExpression", {
    expression,
    argumentExpression:
      typeof index === "number" ? createNumericLiteral(index) : index,
  });
const createCallExpression = (
  expression: Expression,
  typeArguments: readonly TypeNode[] | undefined,
  argumentsArray: readonly Expression[] | undefined,
): CallExpression =>
  make("CallExpression", {
    expression,
    typeArguments,
    arguments: argumentsArray ?? [],
  });
const createNewExpression = (
  expression: Expression,
  typeArguments: readonly TypeNode[] | undefined,
  argumentsArray: readonly Expression[] | undefined,
): NewExpression =>
  make("NewExpression", {
    expression,
    typeArguments,
    arguments: argumentsArray,
  });
const createParenthesizedExpression = (
  expression: Expression,
): ParenthesizedExpression => make("ParenthesizedExpression", { expression });
const createBinaryExpression = (
  left: Expression,
  operator: SyntaxKind | Token,
  right: Expression,
): BinaryExpression =>
  make("BinaryExpression", {
    left,
    operator: typeof operator === "object" ? (operator as any).token : operator,
    right,
  });
const createPrefixUnaryExpression = (
  operator: SyntaxKind,
  operand: Expression,
): PrefixUnaryExpression =>
  make("PrefixUnaryExpression", { operator, operand });
const createPostfixUnaryExpression = (
  operand: Expression,
  operator: SyntaxKind,
): PostfixUnaryExpression =>
  make("PostfixUnaryExpression", { operand, operator });
const createConditionalExpression = (
  condition: Expression,
  _questionToken: Token | undefined,
  whenTrue: Expression,
  _colonToken: Token | undefined,
  whenFalse: Expression,
): ConditionalExpression =>
  make("ConditionalExpression", { condition, whenTrue, whenFalse });
const createArrowFunction = (
  modifiers: readonly ModifierLike[] | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  _equalsGreaterThanToken: Token | undefined,
  body: Block | Expression,
): ArrowFunction =>
  make("ArrowFunction", { modifiers, typeParameters, parameters, type, body });
const createFunctionExpression = (
  modifiers: readonly ModifierLike[] | undefined,
  asteriskToken: Token | undefined,
  name: string | Identifier | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block,
): FunctionExpression =>
  make("FunctionExpression", {
    modifiers,
    asteriskToken,
    name: name === undefined ? undefined : asName(name),
    typeParameters,
    parameters,
    type,
    body,
  });
const createAsExpression = (
  expression: Expression,
  type: TypeNode,
): AsExpression => make("AsExpression", { expression, type });
const createSatisfiesExpression = (
  expression: Expression,
  type: TypeNode,
): SatisfiesExpression => make("SatisfiesExpression", { expression, type });
const createNonNullExpression = (expression: Expression): NonNullExpression =>
  make("NonNullExpression", { expression });
const createSpreadElement = (expression: Expression): SpreadElement =>
  make("SpreadElement", { expression });
const createAwaitExpression = (expression: Expression): AwaitExpression =>
  make("AwaitExpression", { expression });
const createTypeOfExpression = (expression: Expression): TypeOfExpression =>
  make("TypeOfExpression", { expression });

/* types --------------------------------------------------------------------- */
const createKeywordTypeNode = (kind: SyntaxKind): KeywordTypeNode =>
  make("KeywordTypeNode", { keyword: kind });
const createTypeReferenceNode = (
  typeName: string | EntityName,
  typeArguments?: readonly TypeNode[],
): TypeReferenceNode =>
  make("TypeReferenceNode", {
    typeName: asEntityName(typeName),
    typeArguments,
  });
const createArrayTypeNode = (elementType: TypeNode): ArrayTypeNode =>
  make("ArrayTypeNode", { elementType });
const createUnionTypeNode = (types: readonly TypeNode[]): UnionTypeNode =>
  make("UnionTypeNode", { types });
const createIntersectionTypeNode = (
  types: readonly TypeNode[],
): IntersectionTypeNode => make("IntersectionTypeNode", { types });
const createLiteralTypeNode = (
  literal: StringLiteral | NumericLiteral | BigIntLiteral | Token,
): LiteralTypeNode => make("LiteralTypeNode", { literal });
const createTypeLiteralNode = (
  members: readonly TypeElement[] = [],
): TypeLiteralNode => make("TypeLiteralNode", { members });
const createFunctionTypeNode = (
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode,
): FunctionTypeNode =>
  make("FunctionTypeNode", { typeParameters, parameters, type });
const createTupleTypeNode = (elements: readonly TypeNode[]): TupleTypeNode =>
  make("TupleTypeNode", { elements });
const createParenthesizedType = (type: TypeNode): ParenthesizedTypeNode =>
  make("ParenthesizedTypeNode", { type });
const createTypeOperatorNode = (
  operator: SyntaxKind,
  type: TypeNode,
): TypeOperatorNode => make("TypeOperatorNode", { operator, type });
const createIndexedAccessTypeNode = (
  objectType: TypeNode,
  indexType: TypeNode,
): IndexedAccessTypeNode =>
  make("IndexedAccessTypeNode", { objectType, indexType });
const createTypeQueryNode = (exprName: EntityName): TypeQueryNode =>
  make("TypeQueryNode", { exprName });
const createExpressionWithTypeArguments = (
  expression: Expression,
  typeArguments: readonly TypeNode[] | undefined,
): ExpressionWithTypeArguments =>
  make("ExpressionWithTypeArguments", { expression, typeArguments });
const createPropertySignature = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  questionToken: Token | undefined,
  type: TypeNode | undefined,
): PropertySignature =>
  make("PropertySignature", {
    modifiers,
    name: asPropertyName(name),
    questionToken,
    type,
  });
const createIndexSignature = (
  modifiers: readonly ModifierLike[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode,
): IndexSignatureDeclaration =>
  make("IndexSignature", { modifiers, parameters, type });
const createMethodSignature = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  questionToken: Token | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
): MethodSignature =>
  make("MethodSignature", {
    modifiers,
    name: asPropertyName(name),
    questionToken,
    typeParameters,
    parameters,
    type,
  });
const createTypeParameterDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  constraint?: TypeNode,
  defaultType?: TypeNode,
): TypeParameterDeclaration =>
  make("TypeParameterDeclaration", {
    modifiers,
    name: asName(name),
    constraint,
    default: defaultType,
  });

/* support ------------------------------------------------------------------- */
const createParameterDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  dotDotDotToken: Token | undefined,
  name: string | Identifier,
  questionToken?: Token,
  type?: TypeNode,
  initializer?: Expression,
): ParameterDeclaration =>
  make("ParameterDeclaration", {
    modifiers,
    dotDotDotToken,
    name: asName(name),
    questionToken,
    type,
    initializer,
  });
const createHeritageClause = (
  token: SyntaxKind,
  types: readonly ExpressionWithTypeArguments[],
): HeritageClause => make("HeritageClause", { token, types });

/* statements ---------------------------------------------------------------- */
const createVariableStatement = (
  modifiers: readonly ModifierLike[] | undefined,
  declarationList: VariableDeclarationList | readonly VariableDeclaration[],
): VariableStatement =>
  make("VariableStatement", {
    modifiers,
    declarationList: Array.isArray(declarationList)
      ? createVariableDeclarationList(declarationList)
      : declarationList,
  });
const createVariableDeclarationList = (
  declarations: readonly VariableDeclaration[],
  flags: NodeFlags = NodeFlags.None,
): VariableDeclarationList =>
  make("VariableDeclarationList", { declarations, flags });
const createVariableDeclaration = (
  name: string | Identifier,
  exclamationToken?: Token,
  type?: TypeNode,
  initializer?: Expression,
): VariableDeclaration =>
  make("VariableDeclaration", {
    name: asName(name),
    exclamationToken,
    type,
    initializer,
  });
const createExpressionStatement = (
  expression: Expression,
): ExpressionStatement => make("ExpressionStatement", { expression });
const createReturnStatement = (expression?: Expression): ReturnStatement =>
  make("ReturnStatement", { expression });
const createThrowStatement = (expression: Expression): ThrowStatement =>
  make("ThrowStatement", { expression });
const createIfStatement = (
  expression: Expression,
  thenStatement: Statement,
  elseStatement?: Statement,
): IfStatement =>
  make("IfStatement", { expression, thenStatement, elseStatement });
const createBlock = (
  statements: readonly Statement[],
  multiLine?: boolean,
): Block => make("Block", { statements, multiLine: multiLine ?? true });

/* declarations -------------------------------------------------------------- */
const createFunctionDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  asteriskToken: Token | undefined,
  name: string | Identifier | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block | undefined,
): FunctionDeclaration =>
  make("FunctionDeclaration", {
    modifiers,
    asteriskToken,
    name: name === undefined ? undefined : asName(name),
    typeParameters,
    parameters,
    type,
    body,
  });
const createClassDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  heritageClauses: readonly HeritageClause[] | undefined,
  members: readonly ClassElement[],
): ClassDeclaration =>
  make("ClassDeclaration", {
    modifiers,
    name: name === undefined ? undefined : asName(name),
    typeParameters,
    heritageClauses,
    members,
  });
const createPropertyDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  questionOrExclamationToken: Token | undefined,
  type: TypeNode | undefined,
  initializer: Expression | undefined,
): PropertyDeclaration =>
  make("PropertyDeclaration", {
    modifiers,
    name: asPropertyName(name),
    questionOrExclamationToken,
    type,
    initializer,
  });
const createMethodDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  asteriskToken: Token | undefined,
  name: string | PropertyName,
  questionToken: Token | undefined,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block | undefined,
): MethodDeclaration =>
  make("MethodDeclaration", {
    modifiers,
    asteriskToken,
    name: asPropertyName(name),
    questionToken,
    typeParameters,
    parameters,
    type,
    body,
  });
const createConstructorDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  parameters: readonly ParameterDeclaration[],
  body: Block | undefined,
): ConstructorDeclaration =>
  make("ConstructorDeclaration", { modifiers, parameters, body });
const createGetAccessorDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: Block | undefined,
): GetAccessorDeclaration =>
  make("GetAccessorDeclaration", {
    modifiers,
    name: asPropertyName(name),
    parameters,
    type,
    body,
  });
const createSetAccessorDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | PropertyName,
  parameters: readonly ParameterDeclaration[],
  body: Block | undefined,
): SetAccessorDeclaration =>
  make("SetAccessorDeclaration", {
    modifiers,
    name: asPropertyName(name),
    parameters,
    body,
  });
const createInterfaceDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  heritageClauses: readonly HeritageClause[] | undefined,
  members: readonly TypeElement[],
): InterfaceDeclaration =>
  make("InterfaceDeclaration", {
    modifiers,
    name: asName(name),
    typeParameters,
    heritageClauses,
    members,
  });
const createTypeAliasDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  typeParameters: readonly TypeParameterDeclaration[] | undefined,
  type: TypeNode,
): TypeAliasDeclaration =>
  make("TypeAliasDeclaration", {
    modifiers,
    name: asName(name),
    typeParameters,
    type,
  });
const createEnumDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  name: string | Identifier,
  members: readonly EnumMember[],
): EnumDeclaration =>
  make("EnumDeclaration", { modifiers, name: asName(name), members });
const createEnumMember = (
  name: string | PropertyName,
  initializer?: Expression,
): EnumMember =>
  make("EnumMember", { name: asPropertyName(name), initializer });

/* imports & exports --------------------------------------------------------- */
const createImportDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  importClause: ImportClause | undefined,
  moduleSpecifier: Expression | string,
): ImportDeclaration =>
  make("ImportDeclaration", {
    modifiers,
    importClause,
    moduleSpecifier:
      typeof moduleSpecifier === "string"
        ? createStringLiteral(moduleSpecifier)
        : moduleSpecifier,
  });
const createImportClause = (
  isTypeOnly: boolean,
  name: Identifier | undefined,
  namedBindings: NamedImports | NamespaceImport | undefined,
): ImportClause => make("ImportClause", { isTypeOnly, name, namedBindings });
const createNamedImports = (
  elements: readonly ImportSpecifier[],
): NamedImports => make("NamedImports", { elements });
const createImportSpecifier = (
  isTypeOnly: boolean,
  propertyName: Identifier | undefined,
  name: string | Identifier,
): ImportSpecifier =>
  make("ImportSpecifier", { isTypeOnly, propertyName, name: asName(name) });
const createNamespaceImport = (name: string | Identifier): NamespaceImport =>
  make("NamespaceImport", { name: asName(name) });
const createExportDeclaration = (
  modifiers: readonly ModifierLike[] | undefined,
  isTypeOnly: boolean,
  exportClause: NamedExports | NamespaceImport | undefined,
  moduleSpecifier?: Expression | string,
): ExportDeclaration =>
  make("ExportDeclaration", {
    modifiers,
    isTypeOnly,
    exportClause,
    moduleSpecifier:
      typeof moduleSpecifier === "string"
        ? createStringLiteral(moduleSpecifier)
        : moduleSpecifier,
  });
const createNamedExports = (
  elements: readonly ExportSpecifier[],
): NamedExports => make("NamedExports", { elements });
const createExportSpecifier = (
  isTypeOnly: boolean,
  propertyName: string | Identifier | undefined,
  name: string | Identifier,
): ExportSpecifier =>
  make("ExportSpecifier", {
    isTypeOnly,
    propertyName: propertyName === undefined ? undefined : asName(propertyName),
    name: asName(name),
  });
const createExportAssignment = (
  modifiers: readonly ModifierLike[] | undefined,
  isExportEquals: boolean | undefined,
  expression: Expression,
): ExportAssignment =>
  make("ExportAssignment", { modifiers, isExportEquals, expression });

/* source file & node array -------------------------------------------------- */
const createSourceFile = (statements: readonly Statement[]): SourceFile =>
  make("SourceFile", { statements });
const createNodeArray = <T extends Node>(
  elements: readonly T[] = [],
): readonly T[] => elements;
const updateSourceFile = (
  _source: SourceFile,
  statements: readonly Statement[],
): SourceFile => createSourceFile(statements);

/**
 * Hand-written, dependency-free re-implementation of the legacy TypeScript AST
 * node factory (`ts.factory`).
 *
 * Every `createXxx` method mirrors the legacy signature and returns a plain
 * outline node (see {@link Node}) that {@link TsFactoryPrinter} renders to
 * TypeScript source text. No `typescript` module is imported — the logic is
 * implemented directly.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export const factory = {
  createIdentifier,
  createPrivateIdentifier,
  createQualifiedName,
  createToken,
  createModifier,
  createDecorator,
  createTrue,
  createFalse,
  createNull,
  createThis,
  createStringLiteral,
  createNumericLiteral,
  createBigIntLiteral,
  createArrayLiteralExpression,
  createObjectLiteralExpression,
  createPropertyAssignment,
  createShorthandPropertyAssignment,
  createSpreadAssignment,
  createPropertyAccessExpression,
  createElementAccessExpression,
  createCallExpression,
  createNewExpression,
  createParenthesizedExpression,
  createBinaryExpression,
  createPrefixUnaryExpression,
  createPostfixUnaryExpression,
  createConditionalExpression,
  createArrowFunction,
  createFunctionExpression,
  createAsExpression,
  createSatisfiesExpression,
  createNonNullExpression,
  createSpreadElement,
  createAwaitExpression,
  createTypeOfExpression,
  createKeywordTypeNode,
  createTypeReferenceNode,
  createArrayTypeNode,
  createUnionTypeNode,
  createIntersectionTypeNode,
  createLiteralTypeNode,
  createTypeLiteralNode,
  createFunctionTypeNode,
  createTupleTypeNode,
  createParenthesizedType,
  createTypeOperatorNode,
  createIndexedAccessTypeNode,
  createTypeQueryNode,
  createExpressionWithTypeArguments,
  createPropertySignature,
  createIndexSignature,
  createMethodSignature,
  createTypeParameterDeclaration,
  createParameterDeclaration,
  createHeritageClause,
  createVariableStatement,
  createVariableDeclarationList,
  createVariableDeclaration,
  createExpressionStatement,
  createReturnStatement,
  createThrowStatement,
  createIfStatement,
  createBlock,
  createFunctionDeclaration,
  createClassDeclaration,
  createPropertyDeclaration,
  createMethodDeclaration,
  createConstructorDeclaration,
  createGetAccessorDeclaration,
  createSetAccessorDeclaration,
  createInterfaceDeclaration,
  createTypeAliasDeclaration,
  createEnumDeclaration,
  createEnumMember,
  createImportDeclaration,
  createImportClause,
  createNamedImports,
  createImportSpecifier,
  createNamespaceImport,
  createExportDeclaration,
  createNamedExports,
  createExportSpecifier,
  createExportAssignment,
  createSourceFile,
  createNodeArray,
  updateSourceFile,
};

/** The type of the hand-written {@link factory} (an outline of `ts.NodeFactory`). */
export type NodeFactory = typeof factory;
