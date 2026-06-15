import factory, { TsFactoryPrinter, ts } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_file = (): void => {
  const statement = factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier("answer"),
          undefined,
          undefined,
          factory.createNumericLiteral("42"),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
  const printer = new TsFactoryPrinter();
  assert(
    printer.printFile(undefined, [statement]).trim(),
    "const answer = 42;",
  );
};
