import type { EnumMember, Expression, PropertyName } from "../../ast";
import { asPropertyName } from "../internal/asPropertyName";
import { make } from "../internal/make";

export const createEnumMember = (
  name: string | PropertyName,
  initializer?: Expression,
): EnumMember =>
  make("EnumMember", { name: asPropertyName(name), initializer });
