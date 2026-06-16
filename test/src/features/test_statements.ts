import factory, { NodeFlags, SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();
const id = (s: string) => factory.createIdentifier(s);
const num = (s: string) => factory.createNumericLiteral(s);

const decl = (name: string, flags: NodeFlags, value: string) =>
  factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          id(name),
          undefined,
          undefined,
          num(value),
        ),
      ],
      flags,
    ),
  );

export const test_variable_statement = (): void => {
  assert("const", p.print(decl("x", NodeFlags.Const, "1")), "const x = 1;");
  assert("let", p.print(decl("y", NodeFlags.Let, "2")), "let y = 2;");
  assert("var", p.print(decl("z", NodeFlags.None, "3")), "var z = 3;");
};

export const test_typed_declaration = (): void => {
  assert(
    "typed",
    p.print(
      factory.createVariableStatement(
        [factory.createModifier(SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList(
          [
            factory.createVariableDeclaration(
              id("flag"),
              undefined,
              factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword),
              factory.createTrue(),
            ),
          ],
          NodeFlags.Const,
        ),
      ),
    ),
    "export const flag: boolean = true;",
  );
};

export const test_simple_statements = (): void => {
  assert(
    "expression",
    p.print(
      factory.createExpressionStatement(
        factory.createCallExpression(id("run"), undefined, []),
      ),
    ),
    "run();",
  );
  assert("return void", p.print(factory.createReturnStatement()), "return;");
  assert(
    "return value",
    p.print(factory.createReturnStatement(num("1"))),
    "return 1;",
  );
  assert(
    "throw",
    p.print(
      factory.createThrowStatement(
        factory.createNewExpression(id("Error"), undefined, [
          factory.createStringLiteral("boom"),
        ]),
      ),
    ),
    `throw new Error("boom");`,
  );
};

export const test_if_and_block = (): void => {
  assert("empty block", p.print(factory.createBlock([])), "{}");
  assert(
    "if then",
    p.print(
      factory.createIfStatement(
        id("cond"),
        factory.createBlock([factory.createReturnStatement()], true),
      ),
    ),
    ["if (cond) {", "  return;", "}"].join("\n"),
  );
  assert(
    "if else",
    p.print(
      factory.createIfStatement(
        id("cond"),
        factory.createBlock([factory.createReturnStatement(num("1"))], true),
        factory.createBlock([factory.createReturnStatement(num("2"))], true),
      ),
    ),
    ["if (cond) {", "  return 1;", "} else {", "  return 2;", "}"].join("\n"),
  );
};
