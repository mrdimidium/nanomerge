var nanoclone = require('nanoclone')

var mergers = require('./mergers')
var LibError = require('./lib-error')

function merge (config) {
  if (!config) {
    config = {}
  }

  // Validate config
  Object.keys(config.strategy).forEach(function (strategyName) {
    var strategyMerger = mergers.find(function (m) {
      return m.name === strategyName
    })

    if (strategyMerger) {
      var mergerName = config.strategy[strategyName]

      if (!strategyMerger.merge[mergerName]) {
        throw new LibError(
          'Configuration error. Merger ' + mergerName + ' not found'
        )
      }
    } else {
      throw new LibError(
        'Configuration error. Strategy ' + strategyName + ' not found'
      )
    }
  })

  function merger (a, b) {
    if (b === void 0) {
      return nanoclone(a)
    }

    if (a === void 0) {
      return nanoclone(b)
    }

    for (var i = mergers.length - 1; i >= 0; --i) {
      if (mergers[i].is(a) && mergers[i].is(b)) {
        var method = config.strategy[mergers[i].name] || mergers[i].default

        return mergers[i].merge[method](merger, a, b)
      }
    }

    return nanoclone(b)
  }

  return function () {
    var elements = Array.from(arguments)

    return elements.reduce(function (result, element) {
      return merger(result, element)
    })
  }
}

module.exports = merge
