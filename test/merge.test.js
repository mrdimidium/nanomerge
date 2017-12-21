var merge = require('../merge')

it('Config not found', function () {
  expect(typeof merge()).toBe('function')
})

it('Empty config', function () {
  expect(typeof merge({})).toBe('function')
})

it('Normal strategy and merger', function () {
  var config = {
    strategy: {
      array: 'concat'
    }
  }

  expect(typeof merge(config)).toBe('function')
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

it('No strategy values', function () {
  var config = {
    strategy: {}
  }

  expect(merge(config)({ a: null }, { b: undefined }))
    .toEqual({ a: null, b: undefined })
})
