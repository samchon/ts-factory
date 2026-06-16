import type { PropertyName } from "../../ast";
import { createIdentifier } from "../names/createIdentifier";

/** @internal */
export const asName = (name: string | PropertyName): PropertyName =>
  typeof name === "string" ? createIdentifier(name) : name;
