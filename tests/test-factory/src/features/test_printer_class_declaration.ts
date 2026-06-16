import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_printer_class_declaration = (): void => {
  const node = factory.createClassDeclaration(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    "Animal",
    undefined,
    undefined,
    [
      factory.createPropertyDeclaration(
        [factory.createModifier(SyntaxKind.PublicKeyword)],
        "name",
        undefined,
        factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
        undefined,
      ),
      factory.createMethodDeclaration(
        undefined,
        undefined,
        "cry",
        undefined,
        undefined,
        [],
        factory.createKeywordTypeNode(SyntaxKind.VoidKeyword),
        factory.createBlock([factory.createReturnStatement(undefined)], true),
      ),
    ],
  );
  const printer = new TsFactoryPrinter();
  assert(
    printer.print(node),
    [
      "export class Animal {",
      "    public name: string;",
      "    cry(): void {",
      "        return;",
      "    }",
      "}",
    ].join("\n"),
  );
};
