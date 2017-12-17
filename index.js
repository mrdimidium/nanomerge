var merge = require('./merge')

var LibError = require('./lib-error')

function wrapper () {
  var args = Array.from(arguments)

  if (args.length === 0) {
    throw new LibError(
      'The parameter list is empty! ' +
      'The merge function should take config or a list of objects.'
    )
  }

  // Default values
  var config = {
    clone: true,

    strategy: {}
  }

  // custom config
  if (args.length === 1) {
    config = Object.assign(config, args[0])

    return merge(config)
  }

  return merge(config).apply(null, args)
}

module.exports = wrapper
