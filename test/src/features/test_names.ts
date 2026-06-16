import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();

export const test_identifier = (): void => {
  assert("identifier", p.print(factory.createIdentifier("value")), "value");
};

export const test_private_identifier = (): void => {
  assert(
    "private",
    p.print(factory.createPrivateIdentifier("secret")),
    "#secret",
  );
  assert(
    "private#",
    p.print(factory.createPrivateIdentifier("#kept")),
    "#kept",
  );
};

export const test_qualified_name = (): void => {
  assert(
    "qualified",
    p.print(
      factory.createQualifiedName(factory.createIdentifier("ns"), "Type"),
    ),
    "ns.Type",
  );
  assert(
    "qualified deep",
    p.print(
      factory.createQualifiedName(
        factory.createQualifiedName(factory.createIdentifier("a"), "b"),
        "c",
      ),
    ),
    "a.b.c",
  );
};

export const test_keyword_tokens = (): void => {
  assert("true", p.print(factory.createTrue()), "true");
  assert("false", p.print(factory.createFalse()), "false");
  assert("null", p.print(factory.createNull()), "null");
  assert("this", p.print(factory.createThis()), "this");
  assert(
    "token",
    p.print(factory.createToken(SyntaxKind.ReadonlyKeyword)),
    "readonly",
  );
};

export const test_decorator = (): void => {
  assert(
    "decorator",
    p.print(factory.createDecorator(factory.createIdentifier("deco"))),
    "@deco",
  );
};
