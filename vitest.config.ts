import tsconfigPaths from "vitest-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: "./__tests__/vitest/setup.ts",
    coverage: {
      provider: "v8",
      exclude: ["__tests__/**", "**.spec.ts", "**.test.ts", "**.e2e.ts"],
    },
    testTimeout: 15 * 1000,
    env: {
      NODE_ENV: "test",
    },
  },
  plugins: [tsconfigPaths()],
});
