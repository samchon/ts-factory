import type {
  Identifier,
  ImportClause,
  NamedImports,
  NamespaceImport,
} from "../../ast";
import { make } from "../internal/make";

export const createImportClause = (
  isTypeOnly: boolean,
  name: Identifier | undefined,
  namedBindings: NamedImports | NamespaceImport | undefined,
): ImportClause => make("ImportClause", { isTypeOnly, name, namedBindings });
