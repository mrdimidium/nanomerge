var Merge = require("./merge");

var defaultMerger = new Merge({});

/**
 * Nanomerge wrapper
 *
 * @description - merges all the items passed to it into one using the default settings
 * @params {[*]} - Items to merge
 * @return {*} - merged item
 */
function nanomerge() {
  return defaultMerger.merge.apply(defaultMerger, arguments);
}

/**
 * Create custom merger
 *
 * @description - create merger from custom options
 * @param {Object} config - merger config
 * @return {function} - merge function
 */
nanomerge.create = function create(config) {
  if (config === null || typeof config !== "object") {
    throw new Error("Config must be a object");
  }

  var merger = new Merge(config);

  return function merge() {
    return merger.merge.apply(defaultMerger, arguments);
  };
};

module.exports = nanomerge;
