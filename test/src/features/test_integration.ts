import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const id = (s: string) => factory.createIdentifier(s);
const kw = (k: SyntaxKind) => factory.createKeywordTypeNode(k);
const mod = (k: SyntaxKind) => factory.createModifier(k);

export const test_full_module = (): void => {
  const p = new TsFactoryPrinter();
  const importDecl = factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([
        factory.createImportSpecifier(false, undefined, "Base"),
      ]),
    ),
    "./base",
  );
  const classDecl = factory.createClassDeclaration(
    [mod(SyntaxKind.ExportKeyword)],
    "Point",
    undefined,
    [
      factory.createHeritageClause(SyntaxKind.ExtendsKeyword, [
        factory.createExpressionWithTypeArguments(id("Base"), undefined),
      ]),
    ],
    [
      factory.createPropertyDeclaration(
        [mod(SyntaxKind.PrivateKeyword)],
        "value",
        undefined,
        kw(SyntaxKind.NumberKeyword),
        undefined,
      ),
      factory.createMethodDeclaration(
        [mod(SyntaxKind.PublicKeyword)],
        undefined,
        "getValue",
        undefined,
        undefined,
        [],
        kw(SyntaxKind.NumberKeyword),
        factory.createBlock(
          [
            factory.createReturnStatement(
              factory.createPropertyAccessExpression(
                factory.createThis(),
                "value",
              ),
            ),
          ],
          true,
        ),
      ),
    ],
  );
  assert(
    "full module",
    p.printFile(undefined, [importDecl, classDecl]),
    [
      `import { Base } from "./base";`,
      "export class Point extends Base {",
      "  private value: number;",
      "  public getValue(): number {",
      "    return this.value;",
      "  }",
      "}",
      "",
    ].join("\n"),
  );
};

export const test_source_file_node = (): void => {
  const p = new TsFactoryPrinter();
  const file = factory.createSourceFile([
    factory.createExpressionStatement(
      factory.createCallExpression(id("a"), undefined, []),
    ),
    factory.createExpressionStatement(
      factory.createCallExpression(id("b"), undefined, []),
    ),
  ]);
  assert("source file", p.print(file).trim(), ["a();", "b();"].join("\n"));
};
