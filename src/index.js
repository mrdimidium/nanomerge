import Merge from "./merge";

const defaultMerger = new Merge({});

/**
 * Nanomerge wrapper
 *
 * @description - merges all the items passed to it into one using the default settings
 * @params {[*]} - Items to merge
 * @return {*} - merged item
 */
function nanomerge(...args) {
  return defaultMerger.merge(...args);
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

  const merger = new Merge(config);

  return function merge(...args) {
    return merger.merge(...args);
  };
};

export default nanomerge;
