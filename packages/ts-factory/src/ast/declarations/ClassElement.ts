import type { ConstructorDeclaration } from "./ConstructorDeclaration";
import type { GetAccessorDeclaration } from "./GetAccessorDeclaration";
import type { MethodDeclaration } from "./MethodDeclaration";
import type { PropertyDeclaration } from "./PropertyDeclaration";
import type { SetAccessorDeclaration } from "./SetAccessorDeclaration";

export type ClassElement =
  | PropertyDeclaration
  | MethodDeclaration
  | ConstructorDeclaration
  | GetAccessorDeclaration
  | SetAccessorDeclaration;
