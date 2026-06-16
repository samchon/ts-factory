import type { Decorator, Expression } from "../../ast";
import { make } from "../internal/make";

export const createDecorator = (expression: Expression): Decorator =>
  make("Decorator", { expression });
