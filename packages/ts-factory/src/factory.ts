import ts from "typescript";

/**
 * Legacy TypeScript AST node factory.
 *
 * This is the very same {@link ts.NodeFactory} object that the legacy (`<= 6.x`,
 * JavaScript based) TypeScript compiler exposes through `ts.factory`. It is
 * re-published here under a stable, dependency-free import path so that AST
 * based source code generation keeps working even after a project migrates its
 * tool-chain to the TypeScript-Go (tsgo, `>= 7.x`) native compiler, whose
 * `typescript` package no longer ships the JavaScript `ts.factory` API.
 *
 * The API surface is identical to the legacy one. Every `createXXX` method
 * behaves exactly as documented by the TypeScript compiler, and the produced
 * (synthesized) nodes are meant to be turned into text by
 * {@link TsFactoryPrinter}.
 *
 * @author Jeongho Nam - https://github.com/samchon
 * @example
 *   ```typescript
 *   import factory, { TsFactoryPrinter } from "ts-factory";
 *
 *   const node = factory.createCallExpression(
 *     factory.createPropertyAccessExpression(
 *       factory.createIdentifier("console"),
 *       factory.createIdentifier("log"),
 *     ),
 *     undefined,
 *     [factory.createStringLiteral("hello world")],
 *   );
 *   const text: string = new TsFactoryPrinter().print(node);
 *   // console.log("hello world")
 *   ```;
 */
export const factory: ts.NodeFactory = ts.factory;
