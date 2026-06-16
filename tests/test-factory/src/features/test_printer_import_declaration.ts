import factory, { TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_import_declaration = (): void => {
  const node = factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, "factory"),
        factory.createImportSpecifier(false, undefined, "TsFactoryPrinter"),
      ]),
    ),
    "ts-factory",
  );
  const printer = new TsFactoryPrinter();
  assert(
    printer.print(node),
    `import { factory, TsFactoryPrinter } from "ts-factory";`,
  );
};
