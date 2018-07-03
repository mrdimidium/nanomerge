import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",

  external: ["nanoclone"],

  output: [
    {
      file: "dist/nanomerge.cjs.js",
      format: "cjs"
    },
    {
      file: "dist/nanomerge.es6.js",
      format: "es"
    }
  ],

  plugins: [
    resolve(),
    babel({
      babelrc: false,
      presets: [["env", { modules: false }]],
      plugins: ["external-helpers"]
    })
  ]
};
