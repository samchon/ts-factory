import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const id = (s: string) => factory.createIdentifier(s);
const num = (s: string) => factory.createNumericLiteral(s);
const kw = (k: SyntaxKind) => factory.createKeywordTypeNode(k);

export const test_call_breaks_when_over_width = (): void => {
  const tiny = new TsFactoryPrinter({ printWidth: 10 });
  assert(
    "call break",
    tiny.print(
      factory.createCallExpression(id("foo"), undefined, [
        id("a"),
        id("b"),
        id("c"),
      ]),
    ),
    ["foo(", "  a,", "  b,", "  c,", ")"].join("\n"),
  );
};

export const test_generic_breaks_when_over_width = (): void => {
  const tiny = new TsFactoryPrinter({ printWidth: 10 });
  assert(
    "generic break",
    tiny.print(
      factory.createTypeReferenceNode("Map", [
        kw(SyntaxKind.StringKeyword),
        kw(SyntaxKind.NumberKeyword),
      ]),
    ),
    ["Map<", "  string,", "  number,", ">"].join("\n"),
  );
};

export const test_array_and_object_break = (): void => {
  const tiny = new TsFactoryPrinter({ printWidth: 5 });
  assert(
    "array break",
    tiny.print(
      factory.createArrayLiteralExpression([num("1"), num("2"), num("3")]),
    ),
    ["[", "  1,", "  2,", "  3,", "]"].join("\n"),
  );
  assert(
    "object break",
    tiny.print(
      factory.createObjectLiteralExpression([
        factory.createPropertyAssignment("a", num("1")),
      ]),
    ),
    ["{", "  a: 1,", "}"].join("\n"),
  );
};

export const test_union_breaks_with_leading_pipe = (): void => {
  const narrow = new TsFactoryPrinter({ printWidth: 20 });
  assert(
    "union break",
    narrow.print(
      factory.createTypeAliasDeclaration(
        undefined,
        "U",
        undefined,
        factory.createUnionTypeNode([
          kw(SyntaxKind.StringKeyword),
          kw(SyntaxKind.NumberKeyword),
          kw(SyntaxKind.BooleanKeyword),
        ]),
      ),
    ),
    ["type U =", "  | string", "  | number", "  | boolean;"].join("\n"),
  );
};

export const test_deeply_nested_layout = (): void => {
  const forced = new TsFactoryPrinter({ printWidth: 1 });
  const node = factory.createObjectLiteralExpression([
    factory.createPropertyAssignment(
      "items",
      factory.createArrayLiteralExpression([
        factory.createObjectLiteralExpression([
          factory.createPropertyAssignment("id", num("1")),
        ]),
      ]),
    ),
  ]);
  assert(
    "deep nest",
    forced.print(node),
    ["{", "  items: [", "    {", "      id: 1,", "    },", "  ],", "}"].join(
      "\n",
    ),
  );
};
