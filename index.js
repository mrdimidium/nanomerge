var nanoclone = require('nanoclone')

var LibError = require('./lib-error')

var mergers = {
  object: function (merger, a, b) {
    var result = {}

    var keys = {
      a: Object.keys(a),
      b: Object.keys(b)
    }

    keys.a.concat(keys.b).forEach(function (key) {
      result[key] = merger(a[key], b[key])
    })

    return result
  }
}

function merge () {
  function merger (a, b) {
    if (!b) {
      return nanoclone(a)
    }

    var type = typeof b

    if (!a || (typeof a) !== (typeof b) || !mergers[type]) {
      return nanoclone(b)
    }

    return mergers[type](merger, a, b)
  }

  return function () {
    var elements = Array.from(arguments)

    return elements.reduce(function (result, element) {
      return merger(result, element)
    }, {})
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
