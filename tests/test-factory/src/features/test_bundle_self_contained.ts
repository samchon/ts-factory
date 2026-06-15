import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The published bundle must embed the legacy `typescript` implementation and
 * carry zero runtime dependencies. Guard against a regression that would make
 * the output `require("typescript")` again (the very thing this package exists
 * to avoid in the TypeScript-Go era).
 */
export const test_bundle_self_contained = (): void => {
  const root = join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "packages",
    "ts-factory",
  );
  for (const entry of ["lib/index.js", "lib/index.mjs"]) {
    const file = join(root, entry);
    if (!existsSync(file))
      throw new Error(
        `Built bundle not found: ${entry}. Run \`pnpm --filter ts-factory build\` first.`,
      );
    const code = readFileSync(file, "utf8");
    const leaked = /(?:require\(|from\s+)["']typescript["']/.exec(code);
    if (leaked !== null)
      throw new Error(
        `${entry} still references the external "typescript" module — the bundle is not self-contained.`,
      );
  }
};
