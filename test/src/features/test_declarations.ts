import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const p = new TsFactoryPrinter();
const id = (s: string) => factory.createIdentifier(s);
const kw = (k: SyntaxKind) => factory.createKeywordTypeNode(k);
const mod = (k: SyntaxKind) => factory.createModifier(k);
const param = (name: string, type: SyntaxKind) =>
  factory.createParameterDeclaration(
    undefined,
    undefined,
    name,
    undefined,
    kw(type),
    undefined,
  );

export const test_function_declaration = (): void => {
  assert(
    "function",
    p.print(
      factory.createFunctionDeclaration(
        [mod(SyntaxKind.ExportKeyword), mod(SyntaxKind.AsyncKeyword)],
        undefined,
        "load",
        [factory.createTypeParameterDeclaration(undefined, "T")],
        [param("id", SyntaxKind.StringKeyword)],
        factory.createTypeReferenceNode("Promise", [
          factory.createTypeReferenceNode("T"),
        ]),
        factory.createBlock(
          [factory.createReturnStatement(factory.createNull())],
          true,
        ),
      ),
    ),
    [
      "export async function load<T>(id: string): Promise<T> {",
      "  return null;",
      "}",
    ].join("\n"),
  );
};

export const test_class_declaration = (): void => {
  assert(
    "class",
    p.print(
      factory.createClassDeclaration(
        [mod(SyntaxKind.ExportKeyword)],
        "Animal",
        undefined,
        [
          factory.createHeritageClause(SyntaxKind.ExtendsKeyword, [
            factory.createExpressionWithTypeArguments(id("Base"), undefined),
          ]),
          factory.createHeritageClause(SyntaxKind.ImplementsKeyword, [
            factory.createExpressionWithTypeArguments(id("Living"), undefined),
          ]),
        ],
        [
          factory.createPropertyDeclaration(
            [mod(SyntaxKind.PublicKeyword), mod(SyntaxKind.ReadonlyKeyword)],
            "name",
            undefined,
            kw(SyntaxKind.StringKeyword),
            undefined,
          ),
          factory.createConstructorDeclaration(
            undefined,
            [param("name", SyntaxKind.StringKeyword)],
            factory.createBlock([], true),
          ),
          factory.createGetAccessorDeclaration(
            undefined,
            "label",
            [],
            kw(SyntaxKind.StringKeyword),
            factory.createBlock(
              [factory.createReturnStatement(factory.createThis())],
              true,
            ),
          ),
          factory.createMethodDeclaration(
            [factory.createDecorator(id("log"))],
            undefined,
            "cry",
            undefined,
            undefined,
            [],
            kw(SyntaxKind.VoidKeyword),
            factory.createBlock([], true),
          ),
        ],
      ),
    ),
    [
      "export class Animal extends Base implements Living {",
      "  public readonly name: string;",
      "  constructor(name: string) {}",
      "  get label(): string {",
      "    return this;",
      "  }",
      "  @log",
      "  cry(): void {}",
      "}",
    ].join("\n"),
  );
};

export const test_interface_declaration = (): void => {
  assert(
    "interface",
    p.print(
      factory.createInterfaceDeclaration(
        [mod(SyntaxKind.ExportKeyword)],
        "IBox",
        [factory.createTypeParameterDeclaration(undefined, "T")],
        [
          factory.createHeritageClause(SyntaxKind.ExtendsKeyword, [
            factory.createExpressionWithTypeArguments(id("Base"), undefined),
          ]),
        ],
        [
          factory.createPropertySignature(
            [mod(SyntaxKind.ReadonlyKeyword)],
            "value",
            undefined,
            factory.createTypeReferenceNode("T"),
          ),
          factory.createPropertySignature(
            undefined,
            "tag",
            factory.createToken(SyntaxKind.QuestionToken),
            kw(SyntaxKind.StringKeyword),
          ),
          factory.createMethodSignature(
            undefined,
            "map",
            undefined,
            undefined,
            [param("v", SyntaxKind.NumberKeyword)],
            kw(SyntaxKind.VoidKeyword),
          ),
          factory.createIndexSignature(
            undefined,
            [param("key", SyntaxKind.StringKeyword)],
            kw(SyntaxKind.NumberKeyword),
          ),
        ],
      ),
    ),
    [
      "export interface IBox<T> extends Base {",
      "  readonly value: T;",
      "  tag?: string;",
      "  map(v: number): void;",
      "  [key: string]: number;",
      "}",
    ].join("\n"),
  );
};

export const test_type_alias_and_enum = (): void => {
  assert(
    "type alias",
    p.print(
      factory.createTypeAliasDeclaration(
        [mod(SyntaxKind.ExportKeyword)],
        "ID",
        [factory.createTypeParameterDeclaration(undefined, "T")],
        factory.createUnionTypeNode([
          kw(SyntaxKind.StringKeyword),
          kw(SyntaxKind.NumberKeyword),
        ]),
      ),
    ),
    "export type ID<T> = string | number;",
  );
  assert(
    "enum",
    p.print(
      factory.createEnumDeclaration(undefined, "Color", [
        factory.createEnumMember("Red", factory.createNumericLiteral("0")),
        factory.createEnumMember("Green"),
      ]),
    ),
    ["enum Color {", "  Red = 0,", "  Green,", "}"].join("\n"),
  );
};
