// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt(
  {
    features: {
      // Rules for module authors
      tooling: true,
      // Rules for formatting
      stylistic: false,
    },
    dirs: {
      src: ["./playground"],
    },
  },
  {
    rules: {
      "no-console": "off", // allow console.log in TypeScript files
    },
  }
).override("nuxt/typescript", {
  rules: {
    // ...Override rules, for example:
    "@typescript-eslint/ban-types": "off",
  },
});
