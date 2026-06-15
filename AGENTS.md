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

## Conventions

- **Language**: TypeScript, `strict`. Built with `ttsc` (tsgo) + `rollup`.
- **Runtime dependency**: the legacy `typescript` package (`~6.x`), pinned via the
  `typescript` pnpm catalog. It is the implementation behind `factory`, `ts`, and
  `TsFactoryPrinter`; never depend on the native preview at runtime for these.
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
