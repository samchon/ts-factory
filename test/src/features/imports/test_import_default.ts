import { TestValidator } from "@nestia/e2e";
import factory from "ts-factory";

import { id, print } from "../../internal/helpers";

/**
 * Print a default import.
 *
 * `import factory from "ts-factory";`
 */
export const test_import_default = (): void => {
  TestValidator.equals(
    "default",
    print(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, id("factory"), undefined),
        "ts-factory",
      ),
    ),
    'import factory from "ts-factory";',
  );
};
