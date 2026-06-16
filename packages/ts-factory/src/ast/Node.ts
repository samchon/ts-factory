import type { HeritageClause } from "./clauses/HeritageClause";
import type { ParameterDeclaration } from "./clauses/ParameterDeclaration";
import type { ClassDeclaration } from "./declarations/ClassDeclaration";
import type { ConstructorDeclaration } from "./declarations/ConstructorDeclaration";
import type { EnumDeclaration } from "./declarations/EnumDeclaration";
import type { EnumMember } from "./declarations/EnumMember";
import type { FunctionDeclaration } from "./declarations/FunctionDeclaration";
import type { GetAccessorDeclaration } from "./declarations/GetAccessorDeclaration";
import type { InterfaceDeclaration } from "./declarations/InterfaceDeclaration";
import type { MethodDeclaration } from "./declarations/MethodDeclaration";
import type { PropertyDeclaration } from "./declarations/PropertyDeclaration";
import type { SetAccessorDeclaration } from "./declarations/SetAccessorDeclaration";
import type { TypeAliasDeclaration } from "./declarations/TypeAliasDeclaration";
import type { ArrayLiteralExpression } from "./expressions/ArrayLiteralExpression";
import type { ArrowFunction } from "./expressions/ArrowFunction";
import type { AsExpression } from "./expressions/AsExpression";
import type { AwaitExpression } from "./expressions/AwaitExpression";
import type { BigIntLiteral } from "./expressions/BigIntLiteral";
import type { BinaryExpression } from "./expressions/BinaryExpression";
import type { CallExpression } from "./expressions/CallExpression";
import type { ConditionalExpression } from "./expressions/ConditionalExpression";
import type { ElementAccessExpression } from "./expressions/ElementAccessExpression";
import type { FunctionExpression } from "./expressions/FunctionExpression";
import type { NewExpression } from "./expressions/NewExpression";
import type { NonNullExpression } from "./expressions/NonNullExpression";
import type { NumericLiteral } from "./expressions/NumericLiteral";
import type { ObjectLiteralExpression } from "./expressions/ObjectLiteralExpression";
import type { ParenthesizedExpression } from "./expressions/ParenthesizedExpression";
import type { PostfixUnaryExpression } from "./expressions/PostfixUnaryExpression";
import type { PrefixUnaryExpression } from "./expressions/PrefixUnaryExpression";
import type { PropertyAccessExpression } from "./expressions/PropertyAccessExpression";
import type { PropertyAssignment } from "./expressions/PropertyAssignment";
import type { SatisfiesExpression } from "./expressions/SatisfiesExpression";
import type { ShorthandPropertyAssignment } from "./expressions/ShorthandPropertyAssignment";
import type { SpreadAssignment } from "./expressions/SpreadAssignment";
import type { SpreadElement } from "./expressions/SpreadElement";
import type { StringLiteral } from "./expressions/StringLiteral";
import type { TypeOfExpression } from "./expressions/TypeOfExpression";
import type { SourceFile } from "./file/SourceFile";
import type { ExportAssignment } from "./imports/ExportAssignment";
import type { ExportDeclaration } from "./imports/ExportDeclaration";
import type { ExportSpecifier } from "./imports/ExportSpecifier";
import type { ImportClause } from "./imports/ImportClause";
import type { ImportDeclaration } from "./imports/ImportDeclaration";
import type { ImportSpecifier } from "./imports/ImportSpecifier";
import type { NamedExports } from "./imports/NamedExports";
import type { NamedImports } from "./imports/NamedImports";
import type { NamespaceImport } from "./imports/NamespaceImport";
import type { Decorator } from "./names/Decorator";
import type { Identifier } from "./names/Identifier";
import type { PrivateIdentifier } from "./names/PrivateIdentifier";
import type { QualifiedName } from "./names/QualifiedName";
import type { Token } from "./names/Token";
import type { Block } from "./statements/Block";
import type { ExpressionStatement } from "./statements/ExpressionStatement";
import type { IfStatement } from "./statements/IfStatement";
import type { ReturnStatement } from "./statements/ReturnStatement";
import type { ThrowStatement } from "./statements/ThrowStatement";
import type { VariableDeclaration } from "./statements/VariableDeclaration";
import type { VariableDeclarationList } from "./statements/VariableDeclarationList";
import type { VariableStatement } from "./statements/VariableStatement";
import type { ArrayTypeNode } from "./types/ArrayTypeNode";
import type { ExpressionWithTypeArguments } from "./types/ExpressionWithTypeArguments";
import type { FunctionTypeNode } from "./types/FunctionTypeNode";
import type { IndexSignatureDeclaration } from "./types/IndexSignatureDeclaration";
import type { IndexedAccessTypeNode } from "./types/IndexedAccessTypeNode";
import type { IntersectionTypeNode } from "./types/IntersectionTypeNode";
import type { KeywordTypeNode } from "./types/KeywordTypeNode";
import type { LiteralTypeNode } from "./types/LiteralTypeNode";
import type { MethodSignature } from "./types/MethodSignature";
import type { ParenthesizedTypeNode } from "./types/ParenthesizedTypeNode";
import type { PropertySignature } from "./types/PropertySignature";
import type { TupleTypeNode } from "./types/TupleTypeNode";
import type { TypeLiteralNode } from "./types/TypeLiteralNode";
import type { TypeOperatorNode } from "./types/TypeOperatorNode";
import type { TypeParameterDeclaration } from "./types/TypeParameterDeclaration";
import type { TypeQueryNode } from "./types/TypeQueryNode";
import type { TypeReferenceNode } from "./types/TypeReferenceNode";
import type { UnionTypeNode } from "./types/UnionTypeNode";

/**
 * Every AST node produced by {@link factory}: the discriminated union over all
 * node kinds, narrowed by the `kind` tag.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export type Node =
  | Identifier
  | PrivateIdentifier
  | QualifiedName
  | Token
  | Decorator
  | StringLiteral
  | NumericLiteral
  | BigIntLiteral
  | ArrayLiteralExpression
  | ObjectLiteralExpression
  | PropertyAssignment
  | ShorthandPropertyAssignment
  | SpreadAssignment
  | PropertyAccessExpression
  | ElementAccessExpression
  | CallExpression
  | NewExpression
  | ParenthesizedExpression
  | BinaryExpression
  | PrefixUnaryExpression
  | PostfixUnaryExpression
  | ConditionalExpression
  | ArrowFunction
  | FunctionExpression
  | AsExpression
  | SatisfiesExpression
  | NonNullExpression
  | SpreadElement
  | AwaitExpression
  | TypeOfExpression
  | KeywordTypeNode
  | TypeReferenceNode
  | ArrayTypeNode
  | UnionTypeNode
  | IntersectionTypeNode
  | LiteralTypeNode
  | TypeLiteralNode
  | FunctionTypeNode
  | TupleTypeNode
  | ParenthesizedTypeNode
  | TypeOperatorNode
  | IndexedAccessTypeNode
  | TypeQueryNode
  | ExpressionWithTypeArguments
  | PropertySignature
  | IndexSignatureDeclaration
  | MethodSignature
  | TypeParameterDeclaration
  | ParameterDeclaration
  | HeritageClause
  | VariableStatement
  | VariableDeclarationList
  | VariableDeclaration
  | ExpressionStatement
  | ReturnStatement
  | ThrowStatement
  | IfStatement
  | Block
  | FunctionDeclaration
  | ClassDeclaration
  | PropertyDeclaration
  | MethodDeclaration
  | ConstructorDeclaration
  | GetAccessorDeclaration
  | SetAccessorDeclaration
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration
  | EnumMember
  | ImportDeclaration
  | ImportClause
  | NamedImports
  | ImportSpecifier
  | NamespaceImport
  | ExportDeclaration
  | NamedExports
  | ExportSpecifier
  | ExportAssignment
  | SourceFile;
