import type { ClassDeclaration } from "../declarations/ClassDeclaration";
import type { EnumDeclaration } from "../declarations/EnumDeclaration";
import type { FunctionDeclaration } from "../declarations/FunctionDeclaration";
import type { InterfaceDeclaration } from "../declarations/InterfaceDeclaration";
import type { TypeAliasDeclaration } from "../declarations/TypeAliasDeclaration";
import type { ExportAssignment } from "../imports/ExportAssignment";
import type { ExportDeclaration } from "../imports/ExportDeclaration";
import type { ImportDeclaration } from "../imports/ImportDeclaration";
import type { Block } from "./Block";
import type { ExpressionStatement } from "./ExpressionStatement";
import type { IfStatement } from "./IfStatement";
import type { ReturnStatement } from "./ReturnStatement";
import type { ThrowStatement } from "./ThrowStatement";
import type { VariableStatement } from "./VariableStatement";

export type Statement =
  | VariableStatement
  | ExpressionStatement
  | ReturnStatement
  | ThrowStatement
  | IfStatement
  | Block
  | FunctionDeclaration
  | ClassDeclaration
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration
  | ImportDeclaration
  | ExportDeclaration
  | ExportAssignment;
