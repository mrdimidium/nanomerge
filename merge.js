var nanoclone = require("nanoclone");

var types = require("./types");

function Merge(config) {
  if (!config) {
    config = {};
  }

  this.types = types.concat(config.types || []);

  this.config = {
    strategy: config.strategy || {}
  };
}

Merge.prototype.determineType = function(a, b) {
  for (var i = this.types.length - 1; i >= 0; --i) {
    var type = this.types[i];

    if (type.is(a) && type.is(b)) {
      return type;
    } else if (type.is(a) || type.is(b)) {
      break;
    }
  }

  return null;
};

Merge.prototype.step = function(a, b) {
  if (b === void 0) {
    return nanoclone(a);
  }

  var type = this.determineType(a, b);

  if (!type) {
    return nanoclone(b);
  }

  var strategy = this.config.strategy[type.name] || type.default;

  return type.merge[strategy](this.step.bind(this), a, b);
};

Merge.prototype.merge = function() {
  var elements = Array.prototype.slice.call(arguments);

  var result;

  for (var i = elements.length; i > 0; --i) {
    result = this.step(elements.pop(), result);
  }

  return result;
};

module.exports = Merge;
