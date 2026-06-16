import factory, { NodeFlags, TsFactoryPrinter } from "ts-factory";

import { assert } from "../internal/assert";

const id = (s: string) => factory.createIdentifier(s);
const num = (s: string) => factory.createNumericLiteral(s);
const array = factory.createArrayLiteralExpression([num("1"), num("2")]);

export const test_indent_option = (): void => {
  const four = new TsFactoryPrinter({ printWidth: 1, indent: "    " });
  assert(
    "4-space indent",
    four.print(array),
    ["[", "    1,", "    2,", "]"].join("\n"),
  );
};

export const test_newline_option = (): void => {
  const crlf = new TsFactoryPrinter({ printWidth: 1, newLine: "\r\n" });
  assert("crlf", crlf.print(array), ["[", "  1,", "  2,", "]"].join("\r\n"));
};

export const test_print_nodes = (): void => {
  const p = new TsFactoryPrinter();
  const decl = (name: string, value: string) =>
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
        NodeFlags.Const,
      ),
    );
  assert(
    "printNodes",
    p.printNodes([decl("a", "1"), decl("b", "2")]),
    ["const a = 1;", "const b = 2;"].join("\n"),
  );
};

export const test_print_file = (): void => {
  const p = new TsFactoryPrinter();
  const statement = factory.createExpressionStatement(
    factory.createCallExpression(id("main"), undefined, []),
  );
  const text = p.printFile(undefined, [statement]);
  assert("printFile body", text, "main();\n");
  if (!text.endsWith("\n"))
    throw new Error("printFile must end with a newline");
};
