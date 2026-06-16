import { TestValidator } from "@nestia/e2e";
import factory, { SyntaxKind, TsFactoryPrinter } from "ts-factory";

import { kw } from "../../internal/helpers";

/**
 * Generic arguments break when they exceed `printWidth`.
 *
 * `Map<string, number>` breaks under `printWidth: 10` exactly like an argument
 * list would.
 */
export const test_generic_breaks = (): void => {
  const tiny = new TsFactoryPrinter({ printWidth: 10 });
  TestValidator.equals(
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
