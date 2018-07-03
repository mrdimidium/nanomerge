/* eslint-disable global-require, import/no-dynamic-require */

import fs from "fs";
import path from "path";

import nanomerge from "../src/index";

const files = fs.readdirSync(path.join(__dirname, "./fixtures"));
const cases = files.map(file => {
  const item = require(path.join(__dirname, "./fixtures", file));

  return Object.assign({ name: file.match(/(.*)\.js$/)[1] }, item);
});

cases.forEach(test => {
  it(test.name, () => {
    expect(nanomerge(...test.source)).toEqual(test.result);
  });
});
