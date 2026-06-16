import { TestValidator } from "@nestia/e2e";
import factory from "ts-factory";

import { id, printer } from "../../internal/helpers";

/**
 * {@link TsFactoryPrinter.printFile} composes and prints a source file.
 *
 * The result ends with a trailing newline.
 */
export const test_print_file = (): void => {
  const text = printer.printFile(undefined, [
    factory.createExpressionStatement(
      factory.createCallExpression(id("main"), undefined, []),
    ),
  ]);
  TestValidator.equals("body", text, "main();\n");
  TestValidator.predicate("trailing newline", () => text.endsWith("\n"));
};
