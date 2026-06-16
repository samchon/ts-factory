import type { ArrayTypeNode } from "./ArrayTypeNode";
import type { FunctionTypeNode } from "./FunctionTypeNode";
import type { IndexedAccessTypeNode } from "./IndexedAccessTypeNode";
import type { IntersectionTypeNode } from "./IntersectionTypeNode";
import type { KeywordTypeNode } from "./KeywordTypeNode";
import type { LiteralTypeNode } from "./LiteralTypeNode";
import type { ParenthesizedTypeNode } from "./ParenthesizedTypeNode";
import type { TupleTypeNode } from "./TupleTypeNode";
import type { TypeLiteralNode } from "./TypeLiteralNode";
import type { TypeOperatorNode } from "./TypeOperatorNode";
import type { TypeQueryNode } from "./TypeQueryNode";
import type { TypeReferenceNode } from "./TypeReferenceNode";
import type { UnionTypeNode } from "./UnionTypeNode";

/**
 * Any type node.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export type TypeNode =
  | KeywordTypeNode
  | TypeReferenceNode
  | ArrayTypeNode
  | UnionTypeNode
  | IntersectionTypeNode
  | LiteralTypeNode
  | TypeLiteralNode
  | FunctionTypeNode
  | TupleTypeNode
  | ParenthesizedTypeNode
  | TypeOperatorNode
  | IndexedAccessTypeNode
  | TypeQueryNode;
