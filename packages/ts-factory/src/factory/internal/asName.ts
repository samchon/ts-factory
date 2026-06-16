import type { PropertyName } from "../../ast";
import { createIdentifier } from "../names/createIdentifier";

export const asName = (name: string | PropertyName): PropertyName =>
  typeof name === "string" ? createIdentifier(name) : name;
