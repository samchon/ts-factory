/**
 * Assert that `actual` equals `expected`, throwing a readable diff otherwise.
 *
 * @param title Human readable case label.
 * @param actual The generated text.
 * @param expected The text it must equal.
 */
export const assert = (
  title: string,
  actual: string,
  expected: string,
): void => {
  if (actual === expected) return;
  throw new Error(
    [
      `Mismatch: ${title}`,
      "--- actual ---",
      actual,
      "--- expected ---",
      expected,
      "---------------",
    ].join("\n"),
  );
};
