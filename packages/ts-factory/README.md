# `ts-factory`
[![NPM Version](https://img.shields.io/npm/v/ts-factory.svg)](https://www.npmjs.com/package/ts-factory)
[![NPM Downloads](https://img.shields.io/npm/dm/ts-factory.svg)](https://www.npmjs.com/package/ts-factory)
[![GitHub License](https://img.shields.io/github/license/samchon/ts-factory.svg)](https://github.com/samchon/ts-factory/blob/main/LICENSE)

Standalone legacy TypeScript **AST factory** and **printer** for source code generation.

```bash
npm install ts-factory
```

```typescript
import factory, { TsFactoryPrinter } from "ts-factory";

const node = factory.createCallExpression(
  factory.createPropertyAccessExpression(
    factory.createIdentifier("console"),
    factory.createIdentifier("log"),
  ),
  undefined,
  [factory.createStringLiteral("hello world")],
);

const printer = new TsFactoryPrinter();
console.log(printer.print(node));
// console.log("hello world")
```

## Why?

The legacy (`<= 6.x`, JavaScript based) TypeScript compiler exposes a node
factory and a printer through the JavaScript API:

```typescript
import ts from "typescript";

const node = ts.factory.createStringLiteral("hello");
const text = ts.createPrinter().printNode(/* ... */);
```

Once a project migrates its tool-chain to the **TypeScript-Go** (tsgo, `>= 7.x`)
native compiler, that JavaScript `ts.factory` / `ts.Printer` API is no longer
available — so AST based code generation built on top of it breaks.

`ts-factory` keeps that capability alive. It **embeds its own copy** of the
legacy factory and printer (bundled from `typescript@6`) and re-publishes them
**with the exact same API interface** under a stable import path — with **zero
runtime dependencies**. Your code generators keep running regardless of which
compiler builds the rest of your project, and you never install `typescript`.

> The bundled TypeScript implementation is distributed under the Apache License
> 2.0; see [`ThirdPartyNotices.txt`](./ThirdPartyNotices.txt).

## API

| Export                          | Description                                                       |
| ------------------------------- | ---------------------------------------------------------------- |
| `factory` (default export)      | The legacy `ts.NodeFactory` (`ts.factory`), identical interface. |
| `TsFactoryPrinter`              | Ergonomic wrapper around the legacy `ts.Printer`.                |
| `ts`                            | The legacy `typescript` namespace, for enums and types.          |

### `factory`

The default export is the legacy `ts.factory` object verbatim — every
`createXXX` method behaves exactly as the TypeScript compiler documents.

### `TsFactoryPrinter`

A thin wrapper around `ts.createPrinter()` that hides the boilerplate of picking
an `EmitHint` and providing a scratch `SourceFile`.

```typescript
const printer = new TsFactoryPrinter(/* ts.PrinterOptions? */);

printer.print(node);              // print one synthesized node
printer.printNodes([a, b, c]);    // print many nodes, joined by new lines
printer.printFile(undefined, st); // compose & print a whole source file
printer.printer;                  // the underlying ts.Printer (escape hatch)
```

### `ts`

For the AST building blocks you would normally reach into `typescript` for
(`ts.SyntaxKind`, `ts.NodeFlags`, type definitions, ...), import them from here:

```typescript
import { ts } from "ts-factory";

factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
```

## License

MIT © [Jeongho Nam](https://github.com/samchon)
