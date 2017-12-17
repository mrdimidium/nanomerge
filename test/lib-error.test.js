var LibError = require('../lib-error');

it('Must inherit from Error', function () {
  expect((new LibError()) instanceof Error).toBe(true)
});

it('Name and formatted message', function () {
  var message = 'Global error';

  var error = new LibError(message);

  expect(error.name).toBe('NanoMergeError');
  expect(error.message).toBe('[nanomerge]: ' + message);
});
