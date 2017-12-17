var mergers = require('../mergers')

function findMerger (name) {
  return mergers.find(function (el) { return el.name === name })
}

describe('Object', function () {
  it('deep', function () {
    var merger = findMerger('object')

    expect(merger.merge.deep(
      function (a, b) { return (a || 0) + (b || 0) },
      { a: 5, b: 2 },
      { a: 5, b: 2, c: 3 }
    )).toEqual({ a: 10, b: 4, c: 3 })
  })
})

describe('Array', function () {
  it('merge', function () {
    var merger = findMerger('array')

    expect(merger.merge.merge(
      function (a, b) { return (a || 0) + (b || 0) },
      [5, 2],
      [5, 2, 3]
    )).toEqual([10, 4, 3])
  })

  it('replace', function () {
    var merger = findMerger('array')

    expect(merger.merge.replace(
      function () {},
      [5, 2],
      [5, 2, 3]
    )).toEqual([5, 2, 3])
  })

  it('concat', function () {
    var merger = findMerger('array')

    expect(merger.merge.concat(function () {}, [1, 2], [3, 4, 5]))
      .toEqual([1, 2, 3, 4, 5])
  })
})
