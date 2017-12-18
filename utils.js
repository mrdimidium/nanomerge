module.exports.toArray = function toArray (object) {
  var result = []

  for (var i = 0; i < object.length; ++i) {
    result.push(object)
  }

  return Array.from(object)
}
