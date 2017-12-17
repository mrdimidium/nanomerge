var LibError = require('./lib-error')

function merge () {
  return function () {
    var elements = Array.from(arguments)

    return Object.assign.apply(null, ([{}]).concat(elements))
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
