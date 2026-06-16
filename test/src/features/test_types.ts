import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();
const kw = (k: SyntaxKind) => factory.createKeywordTypeNode(k);
const ref = (s: string) => factory.createTypeReferenceNode(s);

export const test_keyword_types = (): void => {
  const pairs: [SyntaxKind, string][] = [
    [SyntaxKind.StringKeyword, "string"],
    [SyntaxKind.NumberKeyword, "number"],
    [SyntaxKind.BooleanKeyword, "boolean"],
    [SyntaxKind.AnyKeyword, "any"],
    [SyntaxKind.UnknownKeyword, "unknown"],
    [SyntaxKind.VoidKeyword, "void"],
    [SyntaxKind.NeverKeyword, "never"],
    [SyntaxKind.ObjectKeyword, "object"],
    [SyntaxKind.UndefinedKeyword, "undefined"],
    [SyntaxKind.NullKeyword, "null"],
    [SyntaxKind.BigIntKeyword, "bigint"],
    [SyntaxKind.SymbolKeyword, "symbol"],
  ];
  for (const [k, text] of pairs)
    assert(`keyword ${text}`, p.print(kw(k)), text);
};

export const test_reference_and_array = (): void => {
  assert("ref", p.print(ref("Foo")), "Foo");
  assert(
    "generic",
    p.print(
      factory.createTypeReferenceNode("Map", [
        kw(SyntaxKind.StringKeyword),
        kw(SyntaxKind.NumberKeyword),
      ]),
    ),
    "Map<string, number>",
  );
  assert(
    "array",
    p.print(factory.createArrayTypeNode(kw(SyntaxKind.StringKeyword))),
    "string[]",
  );
};

export const test_union_intersection = (): void => {
  assert(
    "union inline",
    p.print(
      factory.createUnionTypeNode([
        kw(SyntaxKind.StringKeyword),
        kw(SyntaxKind.NumberKeyword),
      ]),
    ),
    "string | number",
  );
  assert(
    "intersection inline",
    p.print(factory.createIntersectionTypeNode([ref("A"), ref("B")])),
    "A & B",
  );
};

export const test_literal_type = (): void => {
  assert(
    "string literal type",
    p.print(factory.createLiteralTypeNode(factory.createStringLiteral("red"))),
    `"red"`,
  );
  assert(
    "true literal type",
    p.print(factory.createLiteralTypeNode(factory.createTrue())),
    "true",
  );
};

export const test_type_literal = (): void => {
  assert(
    "inline",
    p.print(
      factory.createTypeLiteralNode([
        factory.createPropertySignature(
          undefined,
          "x",
          undefined,
          kw(SyntaxKind.NumberKeyword),
        ),
      ]),
    ),
    "{ x: number }",
  );
};

export const test_function_tuple_operators = (): void => {
  assert(
    "function type",
    p.print(
      factory.createFunctionTypeNode(
        undefined,
        [
          factory.createParameterDeclaration(
            undefined,
            undefined,
            "a",
            undefined,
            kw(SyntaxKind.NumberKeyword),
            undefined,
          ),
        ],
        kw(SyntaxKind.VoidKeyword),
      ),
    ),
    "(a: number) => void",
  );
  assert(
    "tuple",
    p.print(
      factory.createTupleTypeNode([
        kw(SyntaxKind.NumberKeyword),
        kw(SyntaxKind.StringKeyword),
      ]),
    ),
    "[number, string]",
  );
  assert(
    "keyof",
    p.print(factory.createTypeOperatorNode(SyntaxKind.KeyOfKeyword, ref("T"))),
    "keyof T",
  );
  assert(
    "indexed access",
    p.print(factory.createIndexedAccessTypeNode(ref("T"), ref("K"))),
    "T[K]",
  );
  assert(
    "type query",
    p.print(factory.createTypeQueryNode(factory.createIdentifier("value"))),
    "typeof value",
  );
  assert(
    "parenthesized",
    p.print(
      factory.createParenthesizedType(
        factory.createUnionTypeNode([ref("A"), ref("B")]),
      ),
    ),
    "(A | B)",
  );
};
