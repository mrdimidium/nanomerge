/* eslint-disable import/no-extraneous-dependencies */

const chalk = require("chalk");
const benchmark = require("benchmark");

const deepmerge = require("deepmerge");

const nanomerge = require("./");

const suite = new benchmark.Suite();

function formatNumber(number) {
  return String(number).replace(/\d\d\d$/, ",$&");
}

function write(message) {
  process.stdout.write(`${message}\n`);
}

const tests = [
  Array.from(new Array(1000)).map(() => [
    { a: 5, b: { c: { d: {} } } },
    { a: 5, b: { c: { d: { e: 5 } } } }
  ])
];

suite
  .add("nanomerge", () => {
    tests.forEach(test => {
      nanomerge(...test);
    });
  })
  .add("deepmerge", () => {
    tests.forEach(test => {
      deepmerge.all.call(undefined, test);
    });
  })
  .add("Object.assign", () => {
    tests.forEach(test => {
      Object.assign.apply(undefined, test);
    });
  })
  .on("cycle", event => {
    const name = event.target.name.padEnd("Object.assign".length);
    const hz = formatNumber(event.target.hz.toFixed(0)).padStart(7);

    write(`${name} ${chalk.bold(hz)} ops/sec`);
  })
  .on("complete", function complete() {
    const name = this.filter("fastest").map("name");

    write(chalk.bold(`\nFastest is ${chalk.green(name)}\n`));
  })
  .run();
