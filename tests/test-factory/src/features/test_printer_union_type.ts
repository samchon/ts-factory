import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_union_type = (): void => {
  const node = factory.createTypeAliasDeclaration(
    undefined,
    "ID",
    undefined,
    factory.createUnionTypeNode([
      factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
      factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
    ]),
  );
  const printer = new TsFactoryPrinter();
  assert(printer.print(node), "type ID = string | number;");
};
