# AGENTS.md

## Project

`ts-factory` is a **hand-written, dependency-free re-implementation** of the
legacy TypeScript AST factory (`ts.factory`) and printer (`ts.Printer`), so AST
based source code generation keeps working after a project's tool-chain migrates
to the TypeScript-Go (tsgo, `>= 7.x`) native compiler — where the JavaScript
`ts.factory` / `ts.Printer` API no longer exists.

The public contract mirrors the legacy factory ergonomics:

```typescript
import factory, { TsFactoryPrinter, SyntaxKind, NodeFlags } from "ts-factory";
```

- `factory` (default export) — the node factory; `createXxx` methods mirror the
  legacy signatures and return outline AST nodes.
- `TsFactoryPrinter` — renders factory nodes to TypeScript source text.
- `SyntaxKind` / `NodeFlags` — outline token & flag enums.
- Outline AST types (`Expression`, `Statement`, `TypeNode`, `Node`, ...).

## Critical constraint — never `import ts`

The whole point is to NOT depend on the `typescript` module. **Do not** add
`typescript` (or `@typescript/native-preview`) as a runtime dependency, and do
not `import ts from "typescript"` anywhere under `src/`. The factory and printer
logic must be implemented directly. The package ships with **zero runtime
dependencies**.

## Layout

This is a [pnpm](https://pnpm.io) workspace.

- `packages/ts-factory` — the published package (`src/` → `lib/`).
  - `src/syntax.ts` — `SyntaxKind`, `NodeFlags`, token-to-text rendering.
  - `src/ast.ts` — outline node types (category markers + concretes).
  - `src/factory.ts` — the `factory` builders.
  - `src/TsFactoryPrinter.ts` — the recursive printer.
- `config` — shared `tsconfig.json` and `rollup.config.mjs`.
- `tests/test-factory` — dependency-free behavior tests (`test_*` features).

## Conventions

- **Language**: TypeScript, `strict`. Built with `ttsc` (tsgo) + `rollup`.
- **Formatting**: `prettier` (`pnpm format`). 80 columns, 2 spaces, trailing commas.
- **Public API**: keep `createXxx` names and parameter order aligned with the
  legacy `ts.factory`. Extend coverage by adding the node to `src/ast.ts`,
  a builder in `src/factory.ts`, and a `case` in `TsFactoryPrinter.emit`.

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
