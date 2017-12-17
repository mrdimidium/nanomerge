var merge = require('../');
var LibError = require('../lib-error');

it('Parameter list is empty', function () {
    expect(merge).toThrowError(LibError);
});

it('Merging 3 flat objects', function () {
  expect(merge({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
});

it('Load custom config', function () {
  expect(merge({})({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
});
