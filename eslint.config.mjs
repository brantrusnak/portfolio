import coreWebVitals from "eslint-config-next/core-web-vitals";
import importPlugin from "eslint-plugin-import";

const eslintConfig = [
  ...coreWebVitals,

  {
    plugins: { import: importPlugin },
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      "import/no-unresolved": "error",
    },
  },

  // Block cross-feature imports
  {
    files: ["src/app/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "@/app/features/*",
            "src/app/features/*",
          ],
        },
      ],
    },
  },

  // Block shared layers from importing features
  {
    files: [
      "src/components/**/*.{ts,tsx}",
      "src/hooks/**/*.{ts,tsx}",
      "src/utils/**/*.{ts,tsx}",
      "src/types/**/*.{ts,tsx}",
      "src/data/**/*.{ts,tsx}",
      "src/config/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "@/app/features/*",
            "src/app/features/*",
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
