var Merge = require("./merge");

var merger = new Merge();

module.exports = function nanomerge() {
  return merger.merge.apply(merger, arguments);
};
