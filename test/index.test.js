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

it('Merging 3 flat objects', function () {
  expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})

it('Load custom config', function () {
  expect(merge({})({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
})
