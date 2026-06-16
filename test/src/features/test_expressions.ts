import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();
const id = (s: string) => factory.createIdentifier(s);
const num = (s: string) => factory.createNumericLiteral(s);

export const test_array_literal = (): void => {
  assert("empty", p.print(factory.createArrayLiteralExpression([])), "[]");
  assert(
    "inline",
    p.print(factory.createArrayLiteralExpression([num("1"), num("2")])),
    "[1, 2]",
  );
  assert(
    "multiline flag",
    p.print(factory.createArrayLiteralExpression([num("1"), num("2")], true)),
    ["[", "  1,", "  2,", "]"].join("\n"),
  );
};

export const test_object_literal = (): void => {
  assert("empty", p.print(factory.createObjectLiteralExpression([])), "{}");
  assert(
    "inline",
    p.print(
      factory.createObjectLiteralExpression([
        factory.createPropertyAssignment("a", num("1")),
      ]),
    ),
    "{ a: 1 }",
  );
  assert(
    "multiline",
    p.print(
      factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment("a", num("1")),
          factory.createShorthandPropertyAssignment("b"),
          factory.createSpreadAssignment(id("rest")),
        ],
        true,
      ),
    ),
    ["{", "  a: 1,", "  b,", "  ...rest,", "}"].join("\n"),
  );
};

export const test_access = (): void => {
  assert(
    "property",
    p.print(factory.createPropertyAccessExpression(id("a"), "b")),
    "a.b",
  );
  assert(
    "element number",
    p.print(factory.createElementAccessExpression(id("a"), 0)),
    "a[0]",
  );
  assert(
    "element expr",
    p.print(factory.createElementAccessExpression(id("a"), id("k"))),
    "a[k]",
  );
};

export const test_call_and_new = (): void => {
  assert(
    "call",
    p.print(
      factory.createCallExpression(id("fn"), undefined, [id("a"), id("b")]),
    ),
    "fn(a, b)",
  );
  assert(
    "call type args",
    p.print(
      factory.createCallExpression(
        id("fn"),
        [factory.createKeywordTypeNode(SyntaxKind.StringKeyword)],
        [],
      ),
    ),
    "fn<string>()",
  );
  assert(
    "new",
    p.print(factory.createNewExpression(id("Foo"), undefined, [num("1")])),
    "new Foo(1)",
  );
};

export const test_operators = (): void => {
  assert(
    "binary +",
    p.print(
      factory.createBinaryExpression(id("a"), SyntaxKind.PlusToken, id("b")),
    ),
    "a + b",
  );
  assert(
    "binary ===",
    p.print(
      factory.createBinaryExpression(
        id("a"),
        SyntaxKind.EqualsEqualsEqualsToken,
        id("b"),
      ),
    ),
    "a === b",
  );
  assert(
    "prefix",
    p.print(
      factory.createPrefixUnaryExpression(
        SyntaxKind.ExclamationToken,
        id("flag"),
      ),
    ),
    "!flag",
  );
  assert(
    "postfix",
    p.print(
      factory.createPostfixUnaryExpression(id("i"), SyntaxKind.PlusPlusToken),
    ),
    "i++",
  );
  assert(
    "conditional",
    p.print(
      factory.createConditionalExpression(
        id("c"),
        undefined,
        id("a"),
        undefined,
        id("b"),
      ),
    ),
    "c ? a : b",
  );
};

export const test_arrow = (): void => {
  assert(
    "expr body",
    p.print(
      factory.createArrowFunction(
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
          id("x"),
          SyntaxKind.AsteriskToken,
          num("2"),
        ),
      ),
    ),
    "(x: number): number => x * 2",
  );
  assert(
    "block body",
    p.print(
      factory.createArrowFunction(
        undefined,
        undefined,
        [],
        undefined,
        undefined,
        factory.createBlock([factory.createReturnStatement(num("1"))], true),
      ),
    ),
    ["() => {", "  return 1;", "}"].join("\n"),
  );
};

export const test_misc_expressions = (): void => {
  assert(
    "as",
    p.print(
      factory.createAsExpression(
        id("x"),
        factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword),
      ),
    ),
    "x as unknown",
  );
  assert(
    "satisfies",
    p.print(
      factory.createSatisfiesExpression(
        id("x"),
        factory.createTypeReferenceNode("T"),
      ),
    ),
    "x satisfies T",
  );
  assert("nonnull", p.print(factory.createNonNullExpression(id("x"))), "x!");
  assert("spread", p.print(factory.createSpreadElement(id("xs"))), "...xs");
  assert("await", p.print(factory.createAwaitExpression(id("p"))), "await p");
  assert(
    "typeof",
    p.print(factory.createTypeOfExpression(id("v"))),
    "typeof v",
  );
  assert(
    "paren",
    p.print(factory.createParenthesizedExpression(id("x"))),
    "(x)",
  );
};
