import factory, { TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_factory_call_expression = (): void => {
  const node = factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("console"),
      factory.createIdentifier("log"),
    ),
    undefined,
    [factory.createStringLiteral("hello world")],
  );
  const printer = new TsFactoryPrinter();
  assert(printer.print(node), `console.log("hello world")`);
};
