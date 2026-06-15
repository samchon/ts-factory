# AGENTS.md

## Project

`ts-factory` re-publishes the **legacy** (`<= 6.x`, JavaScript based) TypeScript
AST factory (`ts.factory`) and printer (`ts.Printer`) under a stable, standalone
import path, so AST based source code generation keeps working after a project's
tool-chain migrates to the TypeScript-Go (tsgo, `>= 7.x`) native compiler.

The public contract is intentionally identical to the legacy TypeScript API:

```typescript
import factory, { TsFactoryPrinter, ts } from "ts-factory";
```

- `factory` (default export) — the legacy `ts.NodeFactory` (`ts.factory`) verbatim.
- `TsFactoryPrinter` — an ergonomic wrapper around `ts.createPrinter()`.
- `ts` — the legacy `typescript` namespace, for enums and type definitions.

## Layout

This is a [pnpm](https://pnpm.io) workspace.

- `packages/ts-factory` — the published package (`src/` → `lib/`).
- `config` — shared `tsconfig.json` and `rollup.config.mjs`.
- `tests/test-factory` — dependency-free behavior tests (`test_*` features).

## Self-contained — zero runtime dependencies

The published package must NOT depend on the external `typescript` module at
runtime. That dependency is exactly what the TypeScript-Go era removes, so
`ts-factory` **embeds its own copy** of the legacy compiler's factory/printer:

- `typescript` (`~6.x`, pinned via the `typescript` pnpm catalog) is a
  **devDependency only**.
- The build pipeline (`packages/ts-factory`):
  1. `ttsc` compiles `src/` to an **ESM** intermediate in `bin/` (the ESM format
     is what lets rollup preserve our named exports).
  2. `rollup` bundles `bin/index.js` into `lib/index.js` (CJS) and
     `lib/index.mjs` (ESM), **inlining the entire `typescript` implementation**.
     Only Node.js built-ins stay external.
  3. `scripts/postbuild.mjs` vendors `typescript.d.ts` into `lib/`, rewrites every
     `"typescript"` specifier in the emitted `.d.ts` to `"./typescript"`, and
     regenerates `ThirdPartyNotices.txt` (TypeScript is Apache-2.0).
- `tests/test-factory` has a `test_bundle_self_contained` guard asserting the
  built bundle never `require("typescript")`. Keep it green.

## Conventions

- **Language**: TypeScript, `strict`. Built with `ttsc` (tsgo) + `rollup`.
- **Formatting**: `prettier` (`pnpm format`). 80 columns, 2 spaces, trailing commas.
- **Public API**: keep it identical to the legacy TypeScript interface. Add
  ergonomics (like `TsFactoryPrinter`) as additive wrappers, never by diverging
  the underlying factory/printer semantics.

## Commands

| Command       | Description                                  |
| ------------- | -------------------------------------------- |
| `pnpm install`| Install workspace dependencies.              |
| `pnpm build`  | Build every package (`ttsc` then `rollup`).  |
| `pnpm test`   | Build, then run the `tests/test-*` packages. |
| `pnpm format` | Run prettier over the workspace.             |

## Tests

`tests/test-factory` runs every `test_*` export under `src/features`. A test
fails by throwing; it asserts on the exact text produced by `TsFactoryPrinter`.
Add new behavior as a `test_<area>_<case>.ts` feature file and re-export it from
`src/features/index.ts`.
