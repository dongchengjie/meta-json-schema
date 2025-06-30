import { defineConfig } from "json-schema-artifact";

export default defineConfig([
  {
    input: {
      file: "src/meta-json-schema.json",
    },
    output: {
      dir: "schemas",
      optimize: {
        minify: true,
        dereference: "flatten",
      },
    },
    watch: ["src", "locales"],
  },
  {
    input: {
      file: "src/clash-verge-merge-json-schema.json",
    },
    output: {
      dir: "schemas",
      optimize: {
        minify: true,
        dereference: "flatten",
      },
    },
    watch: ["src", "locales"],
  },
  {
    input: {
      file: "src/clash-nyanpasu-merge-json-schema.json",
    },
    output: {
      dir: "schemas",
      optimize: {
        minify: true,
        dereference: "flatten",
      },
    },
    watch: ["src", "locales"],
  }
]);
