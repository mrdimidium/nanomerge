var Merge = require("./merge");

var merger = new Merge();

/**
 * Nanomerge wrapper
 *
 * @description - merges all the items passed to it into one using the default settings
 * @params {[*]} - Items to merge
 * @return {*} - merged item
 */
module.exports = function nanomerge() {
  return merger.merge.apply(merger, arguments);
};
