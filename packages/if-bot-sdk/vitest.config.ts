/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

// https://vitest.dev/config/
export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ["text"],
      include: ["./src"],
      exclude: ["./lib"],
    },
  },
});
