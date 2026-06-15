import factory, { TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

export const test_factory_string_literal = (): void => {
  const printer = new TsFactoryPrinter();
  assert(printer.print(factory.createStringLiteral("hello")), `"hello"`);
};
