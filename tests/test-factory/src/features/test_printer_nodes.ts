import factory, { NodeFlags, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_nodes = (): void => {
  const declare = (name: string, value: string) =>
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(name),
            undefined,
            undefined,
            factory.createNumericLiteral(value),
          ),
        ],
        NodeFlags.Const,
      ),
    );
  const printer = new TsFactoryPrinter();
  assert(
    printer.printNodes([declare("a", "1"), declare("b", "2")]),
    ["const a = 1;", "const b = 2;"].join("\n"),
  );
};
