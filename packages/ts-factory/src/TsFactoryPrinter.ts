import ts from "typescript";

/**
 * Printer turning {@link factory} produced AST nodes into TypeScript source
 * text.
 *
 * `TsFactoryPrinter` is a thin, ergonomic wrapper around the legacy
 * {@link ts.Printer} (the object created by `ts.createPrinter()`). It keeps the
 * exact same emitting behavior as the legacy (`<= 6.x`) TypeScript compiler,
 * while hiding the two boilerplate steps that the raw `ts.Printer` always
 * requires when printing freshly synthesized nodes:
 *
 * 1. Choosing an {@link ts.EmitHint}, and
 * 2. Providing a scratch {@link ts.SourceFile} as the printing context.
 *
 * Both are handled internally, so most call sites only need {@link print}.
 *
 * @author Jeongho Nam - https://github.com/samchon
 * @example
 *   ```typescript
 *   import factory, { TsFactoryPrinter } from "ts-factory";
 *
 *   const printer = new TsFactoryPrinter();
 *   const code: string = printer.print(
 *     factory.createStringLiteral("hello"),
 *   ); // "hello"
 *   ```;
 */
export class TsFactoryPrinter {
  private readonly printer_: ts.Printer;
  private readonly scratch_: ts.SourceFile;

  /**
   * @param options Legacy {@link ts.PrinterOptions}. When omitted, the printer
   *   emits with `LineFeed` new lines for deterministic, cross-platform
   *   output.
   * @param handlers Optional legacy {@link ts.PrintHandlers} hooks.
   */
  public constructor(options?: ts.PrinterOptions, handlers?: ts.PrintHandlers) {
    this.printer_ = ts.createPrinter(
      {
        newLine: ts.NewLineKind.LineFeed,
        ...options,
      },
      handlers,
    );
    this.scratch_ = ts.createSourceFile(
      "module.ts",
      "",
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS,
    );
  }

  /**
   * Print a single synthesized node into TypeScript source text.
   *
   * @param node A node created by {@link factory}.
   * @param hint Emit hint. Defaults to {@link ts.EmitHint.Unspecified}.
   * @param sourceFile Printing context. Defaults to an internal scratch file.
   * @returns The generated TypeScript source text.
   */
  public print(
    node: ts.Node,
    hint: ts.EmitHint = ts.EmitHint.Unspecified,
    sourceFile: ts.SourceFile = this.scratch_,
  ): string {
    return this.printer_.printNode(hint, node, sourceFile);
  }

  /**
   * Print multiple synthesized nodes, joining them with new lines.
   *
   * Useful for emitting a series of statements (imports, declarations, ...)
   * without having to assemble a whole {@link ts.SourceFile} first.
   *
   * @param nodes Nodes created by {@link factory}.
   * @param hint Emit hint. Defaults to {@link ts.EmitHint.Unspecified}.
   * @param sourceFile Printing context. Defaults to an internal scratch file.
   * @returns The generated TypeScript source text.
   */
  public printNodes(
    nodes: readonly ts.Node[],
    hint: ts.EmitHint = ts.EmitHint.Unspecified,
    sourceFile: ts.SourceFile = this.scratch_,
  ): string {
    return nodes
      .map((node) => this.printer_.printNode(hint, node, sourceFile))
      .join("\n");
  }

  /**
   * Print an entire {@link ts.SourceFile}.
   *
   * @param sourceFile The source file to print. When omitted, a source file is
   *   composed on the fly from the given `statements`.
   * @param statements Statements to compose a source file from, when no
   *   `sourceFile` is provided.
   * @returns The generated TypeScript source text.
   */
  public printFile(
    sourceFile?: ts.SourceFile,
    statements: readonly ts.Statement[] = [],
  ): string {
    return this.printer_.printFile(
      sourceFile ?? ts.factory.updateSourceFile(this.scratch_, [...statements]),
    );
  }

  /** The underlying legacy {@link ts.Printer}, for advanced use cases. */
  public get printer(): ts.Printer {
    return this.printer_;
  }
}
