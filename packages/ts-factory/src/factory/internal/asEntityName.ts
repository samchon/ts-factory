import type { EntityName } from "../../ast";
import { createIdentifier } from "../names/createIdentifier";

export const asEntityName = (name: string | EntityName): EntityName =>
  typeof name === "string" ? createIdentifier(name) : name;
