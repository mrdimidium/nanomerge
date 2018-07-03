import { minify } from "uglify-es";
import { uglify } from "rollup-plugin-uglify";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

export default {
  input: "src/index.js",

  external: ["nanoclone"],

  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],

  plugins: [resolve(), uglify({}, minify)]
};
