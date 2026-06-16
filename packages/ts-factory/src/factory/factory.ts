import { createHeritageClause } from "./clauses/createHeritageClause";
import { createParameterDeclaration } from "./clauses/createParameterDeclaration";
import { createClassDeclaration } from "./declarations/createClassDeclaration";
import { createConstructorDeclaration } from "./declarations/createConstructorDeclaration";
import { createEnumDeclaration } from "./declarations/createEnumDeclaration";
import { createEnumMember } from "./declarations/createEnumMember";
import { createFunctionDeclaration } from "./declarations/createFunctionDeclaration";
import { createGetAccessorDeclaration } from "./declarations/createGetAccessorDeclaration";
import { createInterfaceDeclaration } from "./declarations/createInterfaceDeclaration";
import { createMethodDeclaration } from "./declarations/createMethodDeclaration";
import { createPropertyDeclaration } from "./declarations/createPropertyDeclaration";
import { createSetAccessorDeclaration } from "./declarations/createSetAccessorDeclaration";
import { createTypeAliasDeclaration } from "./declarations/createTypeAliasDeclaration";
import { createArrayLiteralExpression } from "./expressions/createArrayLiteralExpression";
import { createArrowFunction } from "./expressions/createArrowFunction";
import { createAsExpression } from "./expressions/createAsExpression";
import { createAwaitExpression } from "./expressions/createAwaitExpression";
import { createBinaryExpression } from "./expressions/createBinaryExpression";
import { createCallExpression } from "./expressions/createCallExpression";
import { createConditionalExpression } from "./expressions/createConditionalExpression";
import { createElementAccessExpression } from "./expressions/createElementAccessExpression";
import { createFunctionExpression } from "./expressions/createFunctionExpression";
import { createNewExpression } from "./expressions/createNewExpression";
import { createNonNullExpression } from "./expressions/createNonNullExpression";
import { createObjectLiteralExpression } from "./expressions/createObjectLiteralExpression";
import { createParenthesizedExpression } from "./expressions/createParenthesizedExpression";
import { createPostfixUnaryExpression } from "./expressions/createPostfixUnaryExpression";
import { createPrefixUnaryExpression } from "./expressions/createPrefixUnaryExpression";
import { createPropertyAccessExpression } from "./expressions/createPropertyAccessExpression";
import { createPropertyAssignment } from "./expressions/createPropertyAssignment";
import { createSatisfiesExpression } from "./expressions/createSatisfiesExpression";
import { createShorthandPropertyAssignment } from "./expressions/createShorthandPropertyAssignment";
import { createSpreadAssignment } from "./expressions/createSpreadAssignment";
import { createSpreadElement } from "./expressions/createSpreadElement";
import { createTypeOfExpression } from "./expressions/createTypeOfExpression";
import { createNodeArray } from "./file/createNodeArray";
import { createSourceFile } from "./file/createSourceFile";
import { updateSourceFile } from "./file/updateSourceFile";
import { createExportAssignment } from "./imports/createExportAssignment";
import { createExportDeclaration } from "./imports/createExportDeclaration";
import { createExportSpecifier } from "./imports/createExportSpecifier";
import { createImportClause } from "./imports/createImportClause";
import { createImportDeclaration } from "./imports/createImportDeclaration";
import { createImportSpecifier } from "./imports/createImportSpecifier";
import { createNamedExports } from "./imports/createNamedExports";
import { createNamedImports } from "./imports/createNamedImports";
import { createNamespaceImport } from "./imports/createNamespaceImport";
import { createBigIntLiteral } from "./literals/createBigIntLiteral";
import { createNumericLiteral } from "./literals/createNumericLiteral";
import { createStringLiteral } from "./literals/createStringLiteral";
import { createDecorator } from "./names/createDecorator";
import { createFalse } from "./names/createFalse";
import { createIdentifier } from "./names/createIdentifier";
import { createModifier } from "./names/createModifier";
import { createNull } from "./names/createNull";
import { createPrivateIdentifier } from "./names/createPrivateIdentifier";
import { createQualifiedName } from "./names/createQualifiedName";
import { createThis } from "./names/createThis";
import { createToken } from "./names/createToken";
import { createTrue } from "./names/createTrue";
import { createBlock } from "./statements/createBlock";
import { createExpressionStatement } from "./statements/createExpressionStatement";
import { createIfStatement } from "./statements/createIfStatement";
import { createReturnStatement } from "./statements/createReturnStatement";
import { createThrowStatement } from "./statements/createThrowStatement";
import { createVariableDeclaration } from "./statements/createVariableDeclaration";
import { createVariableDeclarationList } from "./statements/createVariableDeclarationList";
import { createVariableStatement } from "./statements/createVariableStatement";
import { createArrayTypeNode } from "./types/createArrayTypeNode";
import { createExpressionWithTypeArguments } from "./types/createExpressionWithTypeArguments";
import { createFunctionTypeNode } from "./types/createFunctionTypeNode";
import { createIndexSignature } from "./types/createIndexSignature";
import { createIndexedAccessTypeNode } from "./types/createIndexedAccessTypeNode";
import { createIntersectionTypeNode } from "./types/createIntersectionTypeNode";
import { createKeywordTypeNode } from "./types/createKeywordTypeNode";
import { createLiteralTypeNode } from "./types/createLiteralTypeNode";
import { createMethodSignature } from "./types/createMethodSignature";
import { createParenthesizedType } from "./types/createParenthesizedType";
import { createPropertySignature } from "./types/createPropertySignature";
import { createTupleTypeNode } from "./types/createTupleTypeNode";
import { createTypeLiteralNode } from "./types/createTypeLiteralNode";
import { createTypeOperatorNode } from "./types/createTypeOperatorNode";
import { createTypeParameterDeclaration } from "./types/createTypeParameterDeclaration";
import { createTypeQueryNode } from "./types/createTypeQueryNode";
import { createTypeReferenceNode } from "./types/createTypeReferenceNode";
import { createUnionTypeNode } from "./types/createUnionTypeNode";

/**
 * Hand-written, dependency-free re-implementation of the legacy TypeScript AST
 * node factory (`ts.factory`).
 *
 * Every `createXxx` method mirrors the legacy signature and returns a plain
 * outline node that {@link TsPrinter} renders to TypeScript source text. No
 * `typescript` module is imported — the logic is implemented directly.
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

/** Outline of the legacy `ts.NodeFactory`. */
export type NodeFactory = typeof factory;
