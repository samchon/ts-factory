// Vendoring step for the type declarations.
//
// `ttsc` emits our `.d.ts` files into `bin/`, where they still reference the
// external `typescript` module (e.g. `import ts from "typescript"`). Since the
// published package must NOT depend on `typescript`, we:
//
//   1. copy the legacy `typescript.d.ts` into the package as `lib/typescript.d.ts`,
//   2. rewrite every `"typescript"` specifier in our emitted `.d.ts` to the
//      vendored `"./typescript"`, and
//   3. emit it into `lib/`.
//
// The runtime `.js` / `.mjs` are already self-contained (rollup inlined the
// `typescript` implementation), so the vendored `./typescript` declarations only
// ever serve type resolution — they are never loaded at runtime.
import { createRequire } from "node:module";
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const here = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const pkg = join(here, "..");
const binDir = join(pkg, "bin");
const libDir = join(pkg, "lib");

mkdirSync(libDir, { recursive: true });

// 1) vendor the legacy typescript declarations
const tsEntry = require.resolve("typescript");
const tsLibDir = dirname(tsEntry);
const tsPkgDir = dirname(tsLibDir);
copyFileSync(join(tsLibDir, "typescript.d.ts"), join(libDir, "typescript.d.ts"));

// 1b) embed the TypeScript license, since its implementation is bundled in.
const tsVersion = JSON.parse(
  readFileSync(join(tsPkgDir, "package.json"), "utf8"),
).version;
const tsLicense = readFileSync(join(tsPkgDir, "LICENSE.txt"), "utf8");
writeFileSync(
  join(pkg, "ThirdPartyNotices.txt"),
  [
    "ts-factory bundles a copy of the legacy TypeScript compiler's node factory",
    "and printer implementation. The embedded TypeScript code and declarations",
    `are from "typescript@${tsVersion}", distributed under the Apache License 2.0:`,
    "",
    "-------------------------------------------------------------------------------",
    "TypeScript - Copyright (c) Microsoft Corporation. All rights reserved.",
    "-------------------------------------------------------------------------------",
    "",
    tsLicense.trimEnd(),
    "",
  ].join("\n"),
);

// 2 & 3) copy our emitted declarations, rewriting the module specifier
for (const file of readdirSync(binDir)) {
  if (!file.endsWith(".d.ts")) continue;
  // Only rewire real import/export statements — never text inside JSDoc.
  const code = readFileSync(join(binDir, file), "utf8")
    .replace(
      /^(\s*(?:import|export)\b[^\n]*\bfrom\s+)["']typescript["']/gm,
      '$1"./typescript"',
    )
    .replace(
      /^(\s*import\s+\w+\s*=\s*require\()["']typescript["'](\))/gm,
      '$1"./typescript"$2',
    );
  writeFileSync(join(libDir, file), code);
}

console.log("postbuild: vendored typescript.d.ts and rewired declarations");
