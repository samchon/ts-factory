import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_interface_declaration = (): void => {
  const property = (name: string) =>
    factory.createPropertySignature(
      undefined,
      factory.createIdentifier(name),
      undefined,
      factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
    );
  const node = factory.createInterfaceDeclaration(
    undefined,
    factory.createIdentifier("IPoint"),
    undefined,
    undefined,
    [property("x"), property("y")],
  );
  const printer = new TsFactoryPrinter();
  assert(
    printer.print(node),
    ["interface IPoint {", "    x: number;", "    y: number;", "}"].join("\n"),
  );
};
