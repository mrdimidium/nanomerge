function LibError(message) {
  Error.apply(this, arguments) ;

  this.name = 'NanoMergeError';
  this.message = '[nanomerge]: ' + message;
}

LibError.prototype = Object.create(Error.prototype);

LibError.prototype.constructor = LibError;

module.exports = LibError;
