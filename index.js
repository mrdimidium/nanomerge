var Merge = require('./merge')

var merger = new Merge()

module.exports = merger.merge.bind(merger)
