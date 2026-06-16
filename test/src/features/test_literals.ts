import factory, { TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();

export const test_string_literal = (): void => {
  assert("double", p.print(factory.createStringLiteral("hello")), `"hello"`);
  assert("single", p.print(factory.createStringLiteral("hi", true)), `'hi'`);
  assert(
    "escape quote",
    p.print(factory.createStringLiteral(`a"b`)),
    `"a\\"b"`,
  );
  assert(
    "escape newline",
    p.print(factory.createStringLiteral("a\nb")),
    `"a\\nb"`,
  );
};

export const test_numeric_literal = (): void => {
  assert("string", p.print(factory.createNumericLiteral("42")), "42");
  assert("number", p.print(factory.createNumericLiteral(3.14)), "3.14");
};

export const test_bigint_literal = (): void => {
  assert("plain", p.print(factory.createBigIntLiteral("10")), "10n");
  assert("suffixed", p.print(factory.createBigIntLiteral("20n")), "20n");
};
