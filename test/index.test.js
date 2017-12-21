var merge = require('../')

it('Parameter list is empty', function () {
  expect(merge).toThrow()
})

it('Clone elements', function () {
  var a = { key: 2 }
  var b = { key: 3 }

  merge(a, b)

  expect(a).toEqual({ key: 2 })
  expect(b).toEqual({ key: 3 })
})

it('Load custom config', function () {
  expect(merge({})({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})

it('Strategys field not object', function () {
  var config = {
    strategy: 'incorrect field'
  }

  expect(merge.bind(null, config)).toThrow(Error)
})

it('Strategy not found', function () {
  var config = {
    strategy: {
      lol: 'concat'
    }
  }

  expect(merge.bind(null, config)).toThrow(Error)
})

it('Merger not found', function () {
  var config = {
    strategy: {
      array: 'concat-not-found'
    }
  }

  expect(merge.bind(null, config)).toThrow(Error)
})

it('Merging 3 flat objects', function () {
  expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})

it('Merge nested objects', function () {
  var a = { key: { nested: '5' }, str: 'string' }
  var b = { key: { nested: '8', g: 7 } }

  expect(merge(a, b)).toEqual({ key: { nested: '8', g: 7 }, str: 'string' })
})

it('Merge array', function () {
  var a = [1, 2, 3, 4]
  var b = [5, 6, 7]

  expect(merge(a, b)).toEqual(b)
})

it('Merge nested objects and array', function () {
  var a = { key: { nested: '5', arr: [1, 2, 3] }, g: null }
  var b = { key: { nested: '8', arr: [4, 5] } }

  var result = merge({
    strategy: {
      array: 'concat'
    }
  })(a, b)

  expect(result).toEqual({
    g: null,
    key: { nested: '8', arr: [1, 2, 3, 4, 5] }
  })
})

it('Normal work', function () {
  var cases = [
    // Select result type
    { elements: [{}], result: {} },
    { elements: [{}, {}], result: {} },
    { elements: [{}, []], result: [] },
    { elements: [[], {}], result: {} },
    { elements: [[], null], result: null },
    { elements: [{}, [], null, 0], result: 0 },
    function () {
      function fn () {}

      return { elements: [{}, [], fn], result: fn }
    },

    // Nested
    {
      elements: [{ a: { b: [] }, c: [] }, { a: { b: {} } }],
      result: { a: { b: {} }, c: [] }
    },

    // Change strategy
    {
      config: {
        strategy: {
          array: 'merge'
        }
      },

      elements: [
        { a: [{}, { a: 5 }] }, { a: [{}, { a: 6 }] }
      ],

      result: { a: [{}, { a: 6 }] }
    }
  ]

  cases.forEach(function (c) {
    try {
      c = c()
    } catch (err) {}

    expect(merge(c.config).apply(null, c.elements)).toEqual(c.result)
  })
})
