var merge = require('../')

it('Еlements must clone', function () {
  var a = { key: 2 }
  var b = { key: 3 }

  merge(a, b)

  expect(a).toEqual({ key: 2 })
  expect(b).toEqual({ key: 3 })
})

it('Load custom config', function () {
  expect(merge({})({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
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
    },
    {
      config: {
        strategy: {
          array: 'concat'
        }
      },

      elements: [
        { a: [{}, { a: 5 }] }, { a: [{}, { a: 6 }] }
      ],

      result: { a: [{}, { a: 5 }, {}, { a: 6 }] }
    },
    {
      config: {
        strategy: {
          array: 'replace'
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
