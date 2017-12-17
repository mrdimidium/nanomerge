var merge = require('../')
var LibError = require('../lib-error')

it('Parameter list is empty', function () {
  expect(merge).toThrowError(LibError)
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
