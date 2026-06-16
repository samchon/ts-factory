import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_factory_arrow_function = (): void => {
  const node = factory.createArrowFunction(
    undefined,
    undefined,
    [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        "x",
        undefined,
        factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
        undefined,
      ),
    ],
    factory.createKeywordTypeNode(SyntaxKind.NumberKeyword),
    undefined,
    factory.createBinaryExpression(
      factory.createIdentifier("x"),
      SyntaxKind.AsteriskToken,
      factory.createNumericLiteral("2"),
    ),
  );
  const printer = new TsFactoryPrinter();
  assert(printer.print(node), "(x: number): number => x * 2");
};
