import type { PrivateIdentifier } from "../../ast";
import { make } from "../internal/make";

export const createPrivateIdentifier = (text: string): PrivateIdentifier =>
  make("PrivateIdentifier", { text: text.startsWith("#") ? text : `#${text}` });
