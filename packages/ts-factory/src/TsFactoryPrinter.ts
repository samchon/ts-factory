import type { ModifierLike, Node, SourceFile, Statement } from "./ast";
import { tokenToString } from "./syntax";

/** Options for {@link TsFactoryPrinter}. */
export interface TsFactoryPrinterOptions {
  /** New line sequence. Defaults to `"\n"` (LineFeed). */
  newLine?: string;
  /** Indentation unit. Defaults to four spaces, matching the legacy printer. */
  indent?: string;
}

const escapeString = (text: string, singleQuote?: boolean): string => {
  const escaped: string = text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
  return singleQuote === true
    ? `'${escaped.replace(/'/g, "\\'")}'`
    : `"${escaped.replace(/"/g, '\\"')}"`;
};

/**
 * Printer turning {@link factory} produced AST nodes into TypeScript source
 * text.
 *
 * The printer is implemented directly — it recursively walks the hand-written
 * {@link Node} discriminated union and emits source text with four-space
 * indentation. Every `node.kind` narrows to its concrete type, so the walk is
 * fully type-checked; no `typescript` module is involved.
 *
 * @author Jeongho Nam - https://github.com/samchon
 * @example
 *   ```typescript
 *   import factory, { TsFactoryPrinter } from "ts-factory";
 *
 *   const printer = new TsFactoryPrinter();
 *   printer.print(factory.createStringLiteral("hello")); // "hello"
 *   ```;
 */
export class TsFactoryPrinter {
  private readonly newLine_: string;
  private readonly indent_: string;

  public constructor(options: TsFactoryPrinterOptions = {}) {
    this.newLine_ = options.newLine ?? "\n";
    this.indent_ = options.indent ?? "    ";
  }

  /** Print a single node (or a whole {@link SourceFile}) into source text. */
  public print(node: Node): string {
    return this.lineify(this.emit(node));
  }

  /** Print multiple nodes, joining them with new lines. */
  public printNodes(nodes: readonly Node[]): string {
    return nodes.map((node) => this.print(node)).join(this.newLine_);
  }

  /**
   * Print an entire source file.
   *
   * @param sourceFile A {@link SourceFile}. When omitted, one is composed from
   *   the given `statements`.
   * @param statements Statements to compose a source file from when no
   *   `sourceFile` is provided.
   */
  public printFile(
    sourceFile?: SourceFile,
    statements: readonly Statement[] = [],
  ): string {
    const list: readonly Statement[] = sourceFile
      ? sourceFile.statements
      : statements;
    return this.lineify(list.map((s) => this.emit(s)).join("\n") + "\n");
  }

  /* ----------------------------------------------------------------------- */
  /*  INTERNAL                                                               */
  /* ----------------------------------------------------------------------- */
  private lineify(text: string): string {
    return this.newLine_ === "\n" ? text : text.replace(/\n/g, this.newLine_);
  }

  private indent(text: string): string {
    return text
      .split("\n")
      .map((line) => (line.length ? this.indent_ + line : line))
      .join("\n");
  }

  private list(nodes: readonly Node[] | undefined, separator: string): string {
    return (nodes ?? []).map((n) => this.emit(n)).join(separator);
  }

  private typeArguments(args: readonly Node[] | undefined): string {
    return args && args.length ? `<${this.list(args, ", ")}>` : "";
  }

  private typeParameters(params: readonly Node[] | undefined): string {
    return params && params.length ? `<${this.list(params, ", ")}>` : "";
  }

  private parameters(params: readonly Node[] | undefined): string {
    return `(${this.list(params, ", ")})`;
  }

  private modifiers(
    mods: readonly ModifierLike[] | undefined,
    decoratorsOnNewLine: boolean,
  ): string {
    if (!mods || mods.length === 0) return "";
    const decorators = mods.filter((m) => m.kind === "Decorator");
    const tokens = mods.filter((m) => m.kind !== "Decorator");
    let out: string = "";
    if (decorators.length)
      out +=
        decorators
          .map((d) => this.emit(d))
          .join(decoratorsOnNewLine ? "\n" : " ") +
        (decoratorsOnNewLine ? "\n" : " ");
    if (tokens.length) out += tokens.map((t) => this.emit(t)).join(" ") + " ";
    return out;
  }

  private braced(members: string[], multiLine: boolean): string {
    if (members.length === 0) return multiLine ? "{\n}" : "{}";
    if (!multiLine) return `{ ${members.join(" ")} }`;
    return `{\n${this.indent(members.join("\n"))}\n}`;
  }

  private heritage(clauses: readonly Node[] | undefined): string {
    return clauses && clauses.length ? ` ${this.list(clauses, " ")}` : "";
  }

  private emit(node: Node): string {
    switch (node.kind) {
      /* names & tokens */
      case "Identifier":
        return node.text;
      case "PrivateIdentifier":
        return node.text;
      case "QualifiedName":
        return `${this.emit(node.left)}.${this.emit(node.right)}`;
      case "Token":
        return tokenToString(node.token);
      case "Decorator":
        return `@${this.emit(node.expression)}`;

      /* literals */
      case "StringLiteral":
        return escapeString(node.text, node.singleQuote);
      case "NumericLiteral":
        return node.text;
      case "BigIntLiteral":
        return node.text;

      /* expressions */
      case "ArrayLiteralExpression":
        return node.elements.length === 0
          ? "[]"
          : node.multiLine
            ? `[\n${this.indent(this.list(node.elements, ",\n"))}\n]`
            : `[${this.list(node.elements, ", ")}]`;
      case "ObjectLiteralExpression": {
        const props: string[] = node.properties.map((p) => this.emit(p));
        if (props.length === 0) return "{}";
        return node.multiLine === true
          ? `{\n${this.indent(props.join(",\n"))}\n}`
          : `{ ${props.join(", ")} }`;
      }
      case "PropertyAssignment":
        return `${this.emit(node.name)}: ${this.emit(node.initializer)}`;
      case "ShorthandPropertyAssignment":
        return (
          this.emit(node.name) +
          (node.objectAssignmentInitializer
            ? ` = ${this.emit(node.objectAssignmentInitializer)}`
            : "")
        );
      case "SpreadAssignment":
        return `...${this.emit(node.expression)}`;
      case "PropertyAccessExpression":
        return `${this.emit(node.expression)}.${this.emit(node.name)}`;
      case "ElementAccessExpression":
        return `${this.emit(node.expression)}[${this.emit(node.argumentExpression)}]`;
      case "CallExpression":
        return `${this.emit(node.expression)}${this.typeArguments(
          node.typeArguments,
        )}(${this.list(node.arguments, ", ")})`;
      case "NewExpression":
        return `new ${this.emit(node.expression)}${this.typeArguments(
          node.typeArguments,
        )}(${this.list(node.arguments, ", ")})`;
      case "ParenthesizedExpression":
        return `(${this.emit(node.expression)})`;
      case "BinaryExpression":
        return `${this.emit(node.left)} ${tokenToString(node.operator)} ${this.emit(
          node.right,
        )}`;
      case "PrefixUnaryExpression":
        return `${tokenToString(node.operator)}${this.emit(node.operand)}`;
      case "PostfixUnaryExpression":
        return `${this.emit(node.operand)}${tokenToString(node.operator)}`;
      case "ConditionalExpression":
        return `${this.emit(node.condition)} ? ${this.emit(
          node.whenTrue,
        )} : ${this.emit(node.whenFalse)}`;
      case "ArrowFunction":
        return (
          this.modifiers(node.modifiers, false) +
          this.typeParameters(node.typeParameters) +
          this.parameters(node.parameters) +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          ` => ${this.emit(node.body)}`
        );
      case "FunctionExpression":
        return (
          this.modifiers(node.modifiers, false) +
          "function" +
          (node.asteriskToken ? "*" : "") +
          (node.name ? ` ${this.emit(node.name)}` : "") +
          this.typeParameters(node.typeParameters) +
          this.parameters(node.parameters) +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          ` ${this.emit(node.body)}`
        );
      case "AsExpression":
        return `${this.emit(node.expression)} as ${this.emit(node.type)}`;
      case "SatisfiesExpression":
        return `${this.emit(node.expression)} satisfies ${this.emit(node.type)}`;
      case "NonNullExpression":
        return `${this.emit(node.expression)}!`;
      case "SpreadElement":
        return `...${this.emit(node.expression)}`;
      case "AwaitExpression":
        return `await ${this.emit(node.expression)}`;
      case "TypeOfExpression":
        return `typeof ${this.emit(node.expression)}`;

      /* types */
      case "KeywordTypeNode":
        return tokenToString(node.keyword);
      case "TypeReferenceNode":
        return `${this.emit(node.typeName)}${this.typeArguments(node.typeArguments)}`;
      case "ArrayTypeNode":
        return `${this.emit(node.elementType)}[]`;
      case "UnionTypeNode":
        return this.list(node.types, " | ");
      case "IntersectionTypeNode":
        return this.list(node.types, " & ");
      case "LiteralTypeNode":
        return this.emit(node.literal);
      case "TypeLiteralNode":
        return this.braced(
          node.members.map((m) => `${this.emit(m)};`),
          false,
        );
      case "FunctionTypeNode":
        return `${this.typeParameters(node.typeParameters)}${this.parameters(
          node.parameters,
        )} => ${this.emit(node.type)}`;
      case "TupleTypeNode":
        return `[${this.list(node.elements, ", ")}]`;
      case "ParenthesizedTypeNode":
        return `(${this.emit(node.type)})`;
      case "TypeOperatorNode":
        return `${tokenToString(node.operator)} ${this.emit(node.type)}`;
      case "IndexedAccessTypeNode":
        return `${this.emit(node.objectType)}[${this.emit(node.indexType)}]`;
      case "TypeQueryNode":
        return `typeof ${this.emit(node.exprName)}`;
      case "ExpressionWithTypeArguments":
        return `${this.emit(node.expression)}${this.typeArguments(node.typeArguments)}`;
      case "PropertySignature":
        return (
          this.modifiers(node.modifiers, false) +
          this.emit(node.name) +
          (node.questionToken ? "?" : "") +
          (node.type ? `: ${this.emit(node.type)}` : "")
        );
      case "IndexSignature":
        return (
          this.modifiers(node.modifiers, false) +
          `[${this.list(node.parameters, ", ")}]: ${this.emit(node.type)}`
        );
      case "MethodSignature":
        return (
          this.modifiers(node.modifiers, false) +
          this.emit(node.name) +
          (node.questionToken ? "?" : "") +
          this.typeParameters(node.typeParameters) +
          this.parameters(node.parameters) +
          (node.type ? `: ${this.emit(node.type)}` : "")
        );
      case "TypeParameterDeclaration":
        return (
          this.modifiers(node.modifiers, false) +
          this.emit(node.name) +
          (node.constraint ? ` extends ${this.emit(node.constraint)}` : "") +
          (node.default ? ` = ${this.emit(node.default)}` : "")
        );

      /* support */
      case "ParameterDeclaration":
        return (
          this.modifiers(node.modifiers, false) +
          (node.dotDotDotToken ? "..." : "") +
          this.emit(node.name) +
          (node.questionToken ? "?" : "") +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          (node.initializer ? ` = ${this.emit(node.initializer)}` : "")
        );
      case "HeritageClause":
        return `${tokenToString(node.token)} ${this.list(node.types, ", ")}`;

      /* statements */
      case "VariableStatement":
        return `${this.modifiers(node.modifiers, false)}${this.emit(
          node.declarationList,
        )};`;
      case "VariableDeclarationList": {
        const keyword: string =
          node.flags === 2 ? "const" : node.flags === 1 ? "let" : "var";
        return `${keyword} ${this.list(node.declarations, ", ")}`;
      }
      case "VariableDeclaration":
        return (
          this.emit(node.name) +
          (node.exclamationToken ? "!" : "") +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          (node.initializer ? ` = ${this.emit(node.initializer)}` : "")
        );
      case "ExpressionStatement":
        return `${this.emit(node.expression)};`;
      case "ReturnStatement":
        return node.expression
          ? `return ${this.emit(node.expression)};`
          : "return;";
      case "ThrowStatement":
        return `throw ${this.emit(node.expression)};`;
      case "IfStatement":
        return (
          `if (${this.emit(node.expression)}) ${this.emit(node.thenStatement)}` +
          (node.elseStatement ? ` else ${this.emit(node.elseStatement)}` : "")
        );
      case "Block":
        return node.statements.length === 0
          ? "{\n}"
          : `{\n${this.indent(this.list(node.statements, "\n"))}\n}`;

      /* declarations */
      case "FunctionDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          "function" +
          (node.asteriskToken ? "*" : "") +
          ` ${node.name ? this.emit(node.name) : ""}` +
          this.typeParameters(node.typeParameters) +
          this.parameters(node.parameters) +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          (node.body ? ` ${this.emit(node.body)}` : ";")
        );
      case "ClassDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          "class" +
          (node.name ? ` ${this.emit(node.name)}` : "") +
          this.typeParameters(node.typeParameters) +
          this.heritage(node.heritageClauses) +
          ` ${this.braced(
            node.members.map((m) => this.emit(m)),
            true,
          )}`
        );
      case "PropertyDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          this.emit(node.name) +
          (node.questionOrExclamationToken
            ? this.emit(node.questionOrExclamationToken)
            : "") +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          (node.initializer ? ` = ${this.emit(node.initializer)}` : "") +
          ";"
        );
      case "MethodDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          (node.asteriskToken ? "*" : "") +
          this.emit(node.name) +
          (node.questionToken ? "?" : "") +
          this.typeParameters(node.typeParameters) +
          this.parameters(node.parameters) +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          (node.body ? ` ${this.emit(node.body)}` : ";")
        );
      case "ConstructorDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          `constructor${this.parameters(node.parameters)}` +
          (node.body ? ` ${this.emit(node.body)}` : ";")
        );
      case "GetAccessorDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          `get ${this.emit(node.name)}${this.parameters(node.parameters)}` +
          (node.type ? `: ${this.emit(node.type)}` : "") +
          (node.body ? ` ${this.emit(node.body)}` : ";")
        );
      case "SetAccessorDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          `set ${this.emit(node.name)}${this.parameters(node.parameters)}` +
          (node.body ? ` ${this.emit(node.body)}` : ";")
        );
      case "InterfaceDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          `interface ${this.emit(node.name)}` +
          this.typeParameters(node.typeParameters) +
          this.heritage(node.heritageClauses) +
          ` ${this.braced(
            node.members.map((m) => `${this.emit(m)};`),
            true,
          )}`
        );
      case "TypeAliasDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          `type ${this.emit(node.name)}` +
          this.typeParameters(node.typeParameters) +
          ` = ${this.emit(node.type)};`
        );
      case "EnumDeclaration":
        return (
          this.modifiers(node.modifiers, true) +
          `enum ${this.emit(node.name)} ` +
          (node.members.length === 0
            ? "{\n}"
            : `{\n${this.indent(this.list(node.members, ",\n"))}\n}`)
        );
      case "EnumMember":
        return (
          this.emit(node.name) +
          (node.initializer ? ` = ${this.emit(node.initializer)}` : "")
        );

      /* imports & exports */
      case "ImportDeclaration":
        return (
          this.modifiers(node.modifiers, false) +
          "import " +
          (node.importClause ? `${this.emit(node.importClause)} from ` : "") +
          `${this.emit(node.moduleSpecifier)};`
        );
      case "ImportClause": {
        const named: string[] = [];
        if (node.name) named.push(this.emit(node.name));
        if (node.namedBindings) named.push(this.emit(node.namedBindings));
        return `${node.isTypeOnly ? "type " : ""}${named.join(", ")}`;
      }
      case "NamedImports":
        return node.elements.length === 0
          ? "{}"
          : `{ ${this.list(node.elements, ", ")} }`;
      case "ImportSpecifier":
        return (
          (node.isTypeOnly ? "type " : "") +
          (node.propertyName ? `${this.emit(node.propertyName)} as ` : "") +
          this.emit(node.name)
        );
      case "NamespaceImport":
        return `* as ${this.emit(node.name)}`;
      case "ExportDeclaration":
        return (
          this.modifiers(node.modifiers, false) +
          "export " +
          (node.isTypeOnly ? "type " : "") +
          (node.exportClause ? this.emit(node.exportClause) : "*") +
          (node.moduleSpecifier
            ? ` from ${this.emit(node.moduleSpecifier)}`
            : "") +
          ";"
        );
      case "NamedExports":
        return node.elements.length === 0
          ? "{}"
          : `{ ${this.list(node.elements, ", ")} }`;
      case "ExportSpecifier":
        return (
          (node.isTypeOnly ? "type " : "") +
          (node.propertyName ? `${this.emit(node.propertyName)} as ` : "") +
          this.emit(node.name)
        );
      case "ExportAssignment":
        return (
          this.modifiers(node.modifiers, false) +
          (node.isExportEquals ? "export = " : "export default ") +
          `${this.emit(node.expression)};`
        );

      /* source file */
      case "SourceFile":
        return node.statements.map((s) => this.emit(s)).join("\n") + "\n";

      default:
        return this.unsupported(node);
    }
  }

  private unsupported(node: never): never {
    throw new Error(
      `ts-factory: TsFactoryPrinter cannot print node of kind "${
        (node as Node).kind
      }".`,
    );
  }
}
