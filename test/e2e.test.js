/* eslint-disable es5/no-for-of, es5/no-es6-static-methods, global-require, security/detect-non-literal-require */

var fs = require("fs");
var path = require("path");

var nanomerge = require("../");

var files = fs.readdirSync(path.join(__dirname, "./fixtures"));
var cases = files.map(function(file) {
  var item = require(path.join(__dirname, "./fixtures", file));

  return Object.assign({ name: file.match(/(.*)\.js$/)[1] }, item);
});

for (var test of cases) {
  it(test.name, function() {
    expect(nanomerge.apply(null, test.source)).toEqual(test.result);
  });
}
