import factory, { TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();
const id = (s: string) => factory.createIdentifier(s);
const spec = (name: string, as?: string) =>
  factory.createImportSpecifier(false, as ? id(name) : undefined, as ?? name);

export const test_import_default = (): void => {
  assert(
    "default",
    p.print(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(false, id("factory"), undefined),
        "ts-factory",
      ),
    ),
    `import factory from "ts-factory";`,
  );
};

export const test_import_named = (): void => {
  assert(
    "named",
    p.print(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([spec("a"), spec("b", "c")]),
        ),
        "mod",
      ),
    ),
    `import { a, b as c } from "mod";`,
  );
};

export const test_import_default_and_named = (): void => {
  assert(
    "default + named",
    p.print(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          id("def"),
          factory.createNamedImports([spec("a")]),
        ),
        "mod",
      ),
    ),
    `import def, { a } from "mod";`,
  );
};

export const test_import_namespace_and_type = (): void => {
  assert(
    "namespace",
    p.print(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamespaceImport("ns"),
        ),
        "mod",
      ),
    ),
    `import * as ns from "mod";`,
  );
  assert(
    "type only",
    p.print(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          true,
          undefined,
          factory.createNamedImports([spec("T")]),
        ),
        "mod",
      ),
    ),
    `import type { T } from "mod";`,
  );
};

export const test_import_side_effect = (): void => {
  assert(
    "side effect",
    p.print(factory.createImportDeclaration(undefined, undefined, "polyfill")),
    `import "polyfill";`,
  );
};

export const test_exports = (): void => {
  assert(
    "named export",
    p.print(
      factory.createExportDeclaration(
        undefined,
        false,
        factory.createNamedExports([
          factory.createExportSpecifier(false, undefined, "a"),
          factory.createExportSpecifier(false, "b", "c"),
        ]),
        undefined,
      ),
    ),
    `export { a, b as c };`,
  );
  assert(
    "re-export star",
    p.print(
      factory.createExportDeclaration(undefined, false, undefined, "mod"),
    ),
    `export * from "mod";`,
  );
  assert(
    "export type from",
    p.print(
      factory.createExportDeclaration(
        undefined,
        true,
        factory.createNamedExports([
          factory.createExportSpecifier(false, undefined, "T"),
        ]),
        "mod",
      ),
    ),
    `export type { T } from "mod";`,
  );
  assert(
    "export default",
    p.print(factory.createExportAssignment(undefined, false, id("value"))),
    "export default value;",
  );
  assert(
    "export equals",
    p.print(factory.createExportAssignment(undefined, true, id("value"))),
    "export = value;",
  );
};
