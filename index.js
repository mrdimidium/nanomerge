var nanoclone = require('nanoclone')

var mergers = require('./mergers')
var LibError = require('./lib-error')

function merge () {
  function merger (a, b) {
    if (b === void 0) {
      return nanoclone(a)
    }

    if (a === void 0) {
      return nanoclone(b)
    }

    for (var i = mergers.length - 1; i >= 0; --i) {
      if (mergers[i].is(a) && mergers[i].is(b)) {
        return mergers[i].merge[mergers[i].default](merger, a, b)
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

function wrapper () {
  var args = Array.from(arguments)

  if (args.length === 0) {
    throw new LibError(
      'The parameter list is empty! ' +
      'The merge function should take config or a list of objects.'
    )
  }

  var config = {}

  // custom config
  if (args.length === 1) {
    config = merge(config, args[0])

    return merge(config)
  }

  return merge(config).apply(null, args)
}

module.exports = wrapper
