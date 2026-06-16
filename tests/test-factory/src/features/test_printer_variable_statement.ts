import factory, { NodeFlags, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_variable_statement = (): void => {
  const node = factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier("x"),
          undefined,
          undefined,
          factory.createNumericLiteral("1"),
        ),
      ],
      NodeFlags.Const,
    ),
  );
  const printer = new TsFactoryPrinter();
  assert(printer.print(node), "const x = 1;");
};
