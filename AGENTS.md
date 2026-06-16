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
  - `src/syntax/` — `SyntaxKind`, `NodeFlags`, `tokenToString` (one per file).
  - `src/ast/` — outline node types, **one exported interface/type per file**,
    grouped into `names/ expressions/ types/ statements/ declarations/ clauses/
    imports/ file/`. `Node.ts` is the root; `index.ts` is the barrel.
  - `src/factory/` — the builders, **one exported function per file**, grouped
    the same way; `internal/` holds the `make` / `asName` helpers; `factory.ts`
    assembles the `factory` object; `index.ts` is the barrel.
  - `src/TsFactoryPrinter.ts` — the printer (a single class).
  - `src/internal/doc.ts` — internal Prettier-style pretty-printing engine
    (Doc IR + width-aware layout). Not part of the public API.
- `config` — shared `tsconfig.json` and `rollup.config.mjs`.
- `test` — dependency-free behavior tests (`test_*` features under `src/features`).

## Printer

`TsFactoryPrinter` is **width-aware** (Prettier-style). It builds a `Doc` per
node (`group` / `indent` / `line` / `softline` / `hardline`) and lays it out with
`printDocToString`: each list prints on one line when it fits within
`printWidth` and breaks (with trailing commas) when it does not. Options:
`printWidth` (default `80`), `indent` (default two spaces), `newLine`
(default `"\n"`). Keep output stable under `pnpm format` (i.e. it should match
what Prettier would produce for the same construct).

## Conventions

- **Language**: TypeScript, `strict`. Built with `ttsc` (tsgo) + `rollup`.
- **One exported symbol per file.** Every exported interface/type lives in its
  own file under `src/ast/<category>/`, and every exported function in its own
  file under `src/factory/<category>/`, named exactly after the symbol.
- **Formatting**: `prettier` (`pnpm format`). 80 columns, 2 spaces, trailing commas.
- **Public API**: keep `createXxx` names and parameter order aligned with the
  legacy `ts.factory`. To extend coverage, add the node type under `src/ast/`,
  its builder under `src/factory/` (wire it into `factory/factory.ts`), and a
  `case` in `TsFactoryPrinter.emit`.

## Commands

| Command       | Description                                  |
| ------------- | -------------------------------------------- |
| `pnpm install`| Install workspace dependencies.              |
| `pnpm build`  | Build every package (`ttsc` then `rollup`).  |
| `pnpm test`   | Build, then run the `tests/test-*` packages. |
| `pnpm format` | Run prettier over the workspace.             |

## Tests

`test` runs every `test_*` export under `src/features` (via `ttsx`). A test
fails by throwing; it asserts on the exact text produced by `TsFactoryPrinter`,
including width-aware break behavior (use a small `printWidth` to force breaks
deterministically). Aim for full coverage — every node kind, both inline and
broken, plus deep nesting. Add new behavior to the relevant `src/features/*.ts`
file (re-exported from `src/features/index.ts`).
