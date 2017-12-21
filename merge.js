var nanoclone = require('nanoclone')

var types = require('./types')
var utils = require('./utils')

function merge (config) {
  if (!config) {
    config = {}
  }

  // Validate config
  if (config.strategy) {
    Object.keys(config.strategy).forEach(function (strategyName) {
      var type = types.find(function (t) {
        return t.name === strategyName
      })

      if (type) {
        var strategy = config.strategy[strategyName]

        if (!type.merge[strategy]) {
          throw new Error(
            'Configuration error. Strategy ' + strategyName + ' not found'
          )
        }
      } else {
        throw new Error(
          'Configuration error. Type ' + type + ' not found'
        )
      }
    })
  }

  // merger
  function merger (a, b) {
    if (b === void 0) {
      return nanoclone(a)
    }

    for (var i = types.length - 1; i >= 0; --i) {
      var type = types[i]

      if (type.is(a) && type.is(b)) {
        var strategy = config.strategy[type.name] || type.default

        return type.merge[strategy](merger, a, b)
      }
    }

    return nanoclone(b)
  }

  return function () {
    var elements = utils.toArray(arguments)

    return elements.reduce(function (result, element) {
      return merger(result, element)
    })
  }
}

module.exports = merge
