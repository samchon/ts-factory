import type { Node } from "../../ast";

export const createNodeArray = <T extends Node>(
  elements: readonly T[] = [],
): readonly T[] => elements;
