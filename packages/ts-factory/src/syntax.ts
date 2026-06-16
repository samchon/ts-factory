/**
 * Token kinds used by {@link factory} and {@link TsFactoryPrinter}.
 *
 * This is an outline of the legacy `ts.SyntaxKind` enum: it only enumerates the
 * keyword / modifier / operator tokens that this hand-written factory and
 * printer understand. The numeric values are NOT meaningful and do not match
 * the legacy compiler — only the members and their textual rendering matter
 * here.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export enum SyntaxKind {
  // keyword type nodes & literal keywords
  AnyKeyword,
  UnknownKeyword,
  NumberKeyword,
  BigIntKeyword,
  ObjectKeyword,
  BooleanKeyword,
  StringKeyword,
  SymbolKeyword,
  VoidKeyword,
  UndefinedKeyword,
  NullKeyword,
  NeverKeyword,
  TrueKeyword,
  FalseKeyword,
  ThisKeyword,

  // modifiers
  ExportKeyword,
  DefaultKeyword,
  DeclareKeyword,
  AbstractKeyword,
  AsyncKeyword,
  ConstKeyword,
  PublicKeyword,
  PrivateKeyword,
  ProtectedKeyword,
  ReadonlyKeyword,
  StaticKeyword,
  OverrideKeyword,
  AccessorKeyword,

  // heritage / type operators / word operators
  ExtendsKeyword,
  ImplementsKeyword,
  KeyOfKeyword,
  UniqueKeyword,
  InKeyword,
  InstanceOfKeyword,
  AsKeyword,
  SatisfiesKeyword,
  TypeOfKeyword,

  // punctuation
  DotDotDotToken,
  QuestionToken,
  ColonToken,
  EqualsGreaterThanToken,

  // arithmetic / unary
  PlusToken,
  MinusToken,
  AsteriskToken,
  AsteriskAsteriskToken,
  SlashToken,
  PercentToken,
  PlusPlusToken,
  MinusMinusToken,
  ExclamationToken,
  TildeToken,

  // bitwise
  AmpersandToken,
  BarToken,
  CaretToken,
  LessThanLessThanToken,
  GreaterThanGreaterThanToken,

  // relational / equality / logical
  LessThanToken,
  LessThanEqualsToken,
  GreaterThanToken,
  GreaterThanEqualsToken,
  EqualsEqualsToken,
  EqualsEqualsEqualsToken,
  ExclamationEqualsToken,
  ExclamationEqualsEqualsToken,
  AmpersandAmpersandToken,
  BarBarToken,
  QuestionQuestionToken,

  // assignment
  EqualsToken,
  PlusEqualsToken,
  MinusEqualsToken,
  AsteriskEqualsToken,
  SlashEqualsToken,
}

/**
 * Flags for {@link factory.createVariableDeclarationList}.
 *
 * Outline of the relevant subset of the legacy `ts.NodeFlags`.
 */
export enum NodeFlags {
  None = 0,
  Let = 1,
  Const = 2,
}

const TEXTS: { [key in SyntaxKind]: string } = {
  [SyntaxKind.AnyKeyword]: "any",
  [SyntaxKind.UnknownKeyword]: "unknown",
  [SyntaxKind.NumberKeyword]: "number",
  [SyntaxKind.BigIntKeyword]: "bigint",
  [SyntaxKind.ObjectKeyword]: "object",
  [SyntaxKind.BooleanKeyword]: "boolean",
  [SyntaxKind.StringKeyword]: "string",
  [SyntaxKind.SymbolKeyword]: "symbol",
  [SyntaxKind.VoidKeyword]: "void",
  [SyntaxKind.UndefinedKeyword]: "undefined",
  [SyntaxKind.NullKeyword]: "null",
  [SyntaxKind.NeverKeyword]: "never",
  [SyntaxKind.TrueKeyword]: "true",
  [SyntaxKind.FalseKeyword]: "false",
  [SyntaxKind.ThisKeyword]: "this",

  [SyntaxKind.ExportKeyword]: "export",
  [SyntaxKind.DefaultKeyword]: "default",
  [SyntaxKind.DeclareKeyword]: "declare",
  [SyntaxKind.AbstractKeyword]: "abstract",
  [SyntaxKind.AsyncKeyword]: "async",
  [SyntaxKind.ConstKeyword]: "const",
  [SyntaxKind.PublicKeyword]: "public",
  [SyntaxKind.PrivateKeyword]: "private",
  [SyntaxKind.ProtectedKeyword]: "protected",
  [SyntaxKind.ReadonlyKeyword]: "readonly",
  [SyntaxKind.StaticKeyword]: "static",
  [SyntaxKind.OverrideKeyword]: "override",
  [SyntaxKind.AccessorKeyword]: "accessor",

  [SyntaxKind.ExtendsKeyword]: "extends",
  [SyntaxKind.ImplementsKeyword]: "implements",
  [SyntaxKind.KeyOfKeyword]: "keyof",
  [SyntaxKind.UniqueKeyword]: "unique",
  [SyntaxKind.InKeyword]: "in",
  [SyntaxKind.InstanceOfKeyword]: "instanceof",
  [SyntaxKind.AsKeyword]: "as",
  [SyntaxKind.SatisfiesKeyword]: "satisfies",
  [SyntaxKind.TypeOfKeyword]: "typeof",

  [SyntaxKind.DotDotDotToken]: "...",
  [SyntaxKind.QuestionToken]: "?",
  [SyntaxKind.ColonToken]: ":",
  [SyntaxKind.EqualsGreaterThanToken]: "=>",

  [SyntaxKind.PlusToken]: "+",
  [SyntaxKind.MinusToken]: "-",
  [SyntaxKind.AsteriskToken]: "*",
  [SyntaxKind.AsteriskAsteriskToken]: "**",
  [SyntaxKind.SlashToken]: "/",
  [SyntaxKind.PercentToken]: "%",
  [SyntaxKind.PlusPlusToken]: "++",
  [SyntaxKind.MinusMinusToken]: "--",
  [SyntaxKind.ExclamationToken]: "!",
  [SyntaxKind.TildeToken]: "~",

  [SyntaxKind.AmpersandToken]: "&",
  [SyntaxKind.BarToken]: "|",
  [SyntaxKind.CaretToken]: "^",
  [SyntaxKind.LessThanLessThanToken]: "<<",
  [SyntaxKind.GreaterThanGreaterThanToken]: ">>",

  [SyntaxKind.LessThanToken]: "<",
  [SyntaxKind.LessThanEqualsToken]: "<=",
  [SyntaxKind.GreaterThanToken]: ">",
  [SyntaxKind.GreaterThanEqualsToken]: ">=",
  [SyntaxKind.EqualsEqualsToken]: "==",
  [SyntaxKind.EqualsEqualsEqualsToken]: "===",
  [SyntaxKind.ExclamationEqualsToken]: "!=",
  [SyntaxKind.ExclamationEqualsEqualsToken]: "!==",
  [SyntaxKind.AmpersandAmpersandToken]: "&&",
  [SyntaxKind.BarBarToken]: "||",
  [SyntaxKind.QuestionQuestionToken]: "??",

  [SyntaxKind.EqualsToken]: "=",
  [SyntaxKind.PlusEqualsToken]: "+=",
  [SyntaxKind.MinusEqualsToken]: "-=",
  [SyntaxKind.AsteriskEqualsToken]: "*=",
  [SyntaxKind.SlashEqualsToken]: "/=",
};

/** Render a {@link SyntaxKind} token to its source text (e.g. `===`, `string`). */
export const tokenToString = (kind: SyntaxKind): string => {
  const text: string | undefined = TEXTS[kind];
  if (text === undefined)
    throw new Error(`ts-factory: unknown SyntaxKind token (${kind}).`);
  return text;
};
