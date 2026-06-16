import * as features from "./features";

const main = async (): Promise<void> => {
  const functions: [string, () => unknown][] = Object.entries(features).filter(
    ([key, value]) => key.startsWith("test_") && typeof value === "function",
  ) as [string, () => unknown][];

  const failures: string[] = [];
  for (const [name, func] of functions) {
    try {
      await func();
      console.log(`  - ${name}: Pass`);
    } catch (error) {
      failures.push(name);
      console.log(`  - ${name}: FAILURE`);
      console.log(error instanceof Error ? error.message : error);
    }
  }

  console.log("");
  if (failures.length !== 0) {
    console.log(
      `${failures.length} of ${functions.length} tests failed: ${failures.join(", ")}`,
    );
    process.exit(-1);
  }
  console.log(`All ${functions.length} tests passed`);
};
main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
