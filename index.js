var merge = require('./merge')
var utils = require('./utils')

var LibError = require('./lib-error')

function wrapper () {
  var args = utils.toArray(arguments)

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
