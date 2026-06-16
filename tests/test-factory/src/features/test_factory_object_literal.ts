import factory, { TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_factory_object_literal = (): void => {
  const node = factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment("a", factory.createNumericLiteral("1")),
      factory.createPropertyAssignment("b", factory.createStringLiteral("two")),
    ],
    true,
  );
  const printer = new TsFactoryPrinter();
  assert(
    printer.print(node),
    ["{", "    a: 1,", `    b: "two"`, "}"].join("\n"),
  );
};
