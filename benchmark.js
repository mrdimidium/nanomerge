/* eslint-disable node/no-unpublished-require, es5/no-es6-static-methods */

var chalk = require("chalk");
var benchmark = require("benchmark");

var deepmerge = require("deepmerge");

var nanomerge = require("./");

var suite = new benchmark.Suite();

function formatNumber(number) {
  return String(number).replace(/\d\d\d$/, ",$&");
}

function write(message) {
  process.stdout.write(message + "\n");
}

var tests = [
  Array.from(new Array(1000)).map(function() {
    return [{ a: 5, b: { c: { d: {} } } }, { a: 5, b: { c: { d: { e: 5 } } } }];
  })
];

suite
  .add("nanomerge", function() {
    tests.forEach(function(test) {
      nanomerge.apply(undefined, test);
    });
  })
  .add("deepmerge", function() {
    tests.forEach(function(test) {
      deepmerge.all.call(undefined, test);
    });
  })
  .add("Object.assign", function() {
    tests.forEach(function(test) {
      Object.assign.apply(undefined, test);
    });
  })
  .on("cycle", function(event) {
    var name = event.target.name.padEnd("Object.assign".length);
    var hz = formatNumber(event.target.hz.toFixed(0)).padStart(7);

    write(name + " " + chalk.bold(hz) + " ops/sec");
  })
  .on("complete", function() {
    // eslint-disable-next-line no-invalid-this
    var name = this.filter("fastest").map("name");

    write(chalk.bold("\nFastest is " + chalk.green(name) + "\n"));
  })
  .run();
