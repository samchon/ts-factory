# AGENTS.md

## Project

`ts-factory` is a **hand-written, dependency-free re-implementation** of the
legacy TypeScript AST factory (`ts.factory`) and printer (`ts.Printer`), so AST
based source code generation keeps working after a project's tool-chain migrates
to the TypeScript-Go (tsgo, `>= 7.x`) native compiler — where the JavaScript
`ts.factory` / `ts.Printer` API no longer exists.

The public contract mirrors the legacy factory ergonomics:

```typescript
import factory, { TsPrinter, SyntaxKind, NodeFlags } from "ts-factory";
```

- `factory` (default export) — the node factory; `createXxx` methods mirror the
  legacy signatures and return outline AST nodes.
- `TsPrinter` — renders factory nodes to TypeScript source text.
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
  - `src/TsPrinter.ts` — the printer (a single class).
  - `src/internal/doc.ts` — internal Prettier-style pretty-printing engine
    (Doc IR + width-aware layout). Not part of the public API.
- `config` — shared `tsconfig.json` and `rollup.config.mjs`.
- `test` — dependency-free behavior tests (`test_*` features under `src/features`).

## Printer

`TsPrinter` is **width-aware** (Prettier-style). It builds a `Doc` per
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
  `case` in `TsPrinter.emit`.

## Commands

| Command       | Description                                  |
| ------------- | -------------------------------------------- |
| `pnpm install`| Install workspace dependencies.              |
| `pnpm build`  | Build every package (`ttsc` then `rollup`).  |
| `pnpm test`   | Build, then run the `tests/test-*` packages. |
| `pnpm format` | Run prettier over the workspace.             |

## Tests

`test` uses `@nestia/e2e` — `DynamicExecutor` discovers every `test_*` function
under `src/features` (recursively) and runs it; assertions use `TestValidator`
(`TestValidator.equals(title, actual, expected)` / `.predicate`).

Conventions (match samchon's other repos):

- **One test function per file**, at `src/features/<category>/test_<name>.ts`.
- Every test function carries a **JSDoc describing the scenario** it covers.
- Shared shorthands (`id`, `kw`, `print`, ...) live in `src/internal/helpers.ts`.
- Cover every factory function and every printer branch — inline *and*
  width-broken (use a small `printWidth` to force breaks deterministically),
  including deep nesting. Keep structural coverage at 100% (every `createXxx`
  referenced; every node kind printed).
