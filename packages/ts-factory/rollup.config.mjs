import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { builtinModules } from "node:module";

// Keep only Node.js built-ins external. Everything else — most importantly the
// legacy `typescript` package that backs `factory`, `ts` and `TsFactoryPrinter`
// — is bundled INTO the output, so the published package carries its own copy of
// the legacy TypeScript factory/printer and has zero runtime dependencies.
const builtins = new Set([
  ...builtinModules,
  ...builtinModules.map((name) => `node:${name}`),
]);

export default {
  input: "./bin/index.js",
  external: (id) => builtins.has(id) || id.startsWith("node:"),
  output: [
    {
      file: "./lib/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      inlineDynamicImports: true,
    },
    {
      file: "./lib/index.mjs",
      format: "esm",
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs({ ignoreDynamicRequires: true }),
  ],
};
