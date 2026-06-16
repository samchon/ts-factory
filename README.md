# ts-factory
[![NPM Version](https://img.shields.io/npm/v/ts-factory.svg)](https://www.npmjs.com/package/ts-factory)
[![NPM Downloads](https://img.shields.io/npm/dm/ts-factory.svg)](https://www.npmjs.com/package/ts-factory)
[![GitHub License](https://img.shields.io/github/license/samchon/ts-factory.svg)](https://github.com/samchon/ts-factory/blob/main/LICENSE)
[![Build Status](https://github.com/samchon/ts-factory/workflows/build/badge.svg)](https://github.com/samchon/ts-factory/actions?query=workflow%3Abuild)

Hand-written, dependency-free TypeScript **AST factory** and **printer** for source code generation.

```typescript
import factory, { TsPrinter } from "ts-factory";

const node = factory.createCallExpression(
  factory.createPropertyAccessExpression(
    factory.createIdentifier("console"),
    factory.createIdentifier("log"),
  ),
  undefined,
  [factory.createStringLiteral("hello world")],
);

const printer = new TsPrinter();
console.log(printer.print(node));
// console.log("hello world")
```

When a project migrates its tool-chain to the **TypeScript-Go** (tsgo, `>= 7.x`)
native compiler, the legacy JavaScript `ts.factory` / `ts.Printer` API used for
AST based code generation is no longer available. `ts-factory` **re-implements
that factory and printer directly** — never importing `typescript`, with **zero
dependencies** — so your code generators keep working no matter which compiler
builds the rest of your project.

See [`packages/ts-factory/README.md`](./packages/ts-factory/README.md) for the
full API documentation.

## Development

This repository is a [pnpm](https://pnpm.io) workspace.

```bash
pnpm install   # install dependencies
pnpm build     # build every package (ttsc + rollup)
pnpm test      # build, then run the test packages
pnpm format    # prettier
```

| Path                     | Description                                  |
| ------------------------ | -------------------------------------------- |
| `packages/ts-factory`    | The published `ts-factory` package.          |
| `config`                 | Shared `tsconfig` and `rollup` configuration.|
| `test`                   | Behavior tests for factory and printer.      |

## License

MIT © [Jeongho Nam](https://github.com/samchon)
