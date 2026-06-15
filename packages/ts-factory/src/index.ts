import ts from "typescript";

import { factory } from "./factory";

/**
 * The legacy TypeScript namespace (`<= 6.x`), re-published for convenience.
 *
 * Use it as a drop-in replacement for `import ts from "typescript"` when you
 * only need the AST building blocks (enums like {@link ts.SyntaxKind}, type
 * definitions like {@link ts.Node}, the {@link ts.EmitHint} hints, ...) for
 * source code generation. It stays available even after the surrounding
 * tool-chain moves on to the TypeScript-Go (tsgo) native compiler.
 */
export { ts };

/**
 * The legacy {@link ts.NodeFactory}, also available as the default export.
 *
 * @see {@link factory} for details.
 */
export { factory };

export * from "./factory";
export * from "./TsFactoryPrinter";

/**
 * Default export: the legacy {@link ts.NodeFactory}.
 *
 * ```typescript
 * import factory, { TsFactoryPrinter } from "ts-factory";
 * ```
 */
export default factory;
