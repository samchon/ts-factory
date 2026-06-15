import factory, { TsFactoryPrinter, ts } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_type_alias = (): void => {
  const node = factory.createTypeAliasDeclaration(
    undefined,
    factory.createIdentifier("MyString"),
    undefined,
    factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
  );
  const printer = new TsFactoryPrinter();
  assert(printer.print(node), "type MyString = string;");
};
