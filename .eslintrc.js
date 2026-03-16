/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next"],
  ignorePatterns: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint.config.mjs",
    "next.config.ts",
    "postcss.config.mjs",
    "tailwind.config.*",
    "tsconfig.tsbuildinfo",
  ],
};

