import type { IndexSignatureDeclaration } from "./IndexSignatureDeclaration";
import type { MethodSignature } from "./MethodSignature";
import type { PropertySignature } from "./PropertySignature";

export type TypeElement =
  | PropertySignature
  | IndexSignatureDeclaration
  | MethodSignature;
