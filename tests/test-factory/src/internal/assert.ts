export const assert = (actual: string, expected: string): void => {
  if (actual !== expected)
    throw new Error(
      [
        "Generated text does not match the expected one.",
        "",
        "--- actual ---",
        actual,
        "--- expected ---",
        expected,
      ].join("\n"),
    );
};
