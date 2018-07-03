export default {
  input: "src/index.js",

  external: [ 'nanoclone' ],

  output: [
    {
      file: 'dist/nanomerge.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/nanomerge.es6.js',
      format: 'es'
    }
  ]
};
