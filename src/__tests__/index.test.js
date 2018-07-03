var Merge = require("../merge");

jest.mock("../merge", function() {
  var FakeMerge = jest.fn();

  FakeMerge.prototype.merge = jest.fn();

  return FakeMerge;
});

var nanomerge = require("../.");

it("Must to create Merge", function() {
  expect(Merge.mock.calls).toMatchSnapshot();
});

it("Must run Merge.merge", function() {
  nanomerge({}, {}, {});
  nanomerge([], []);
  nanomerge([], [], {});

  expect(Merge.prototype.merge.mock.calls).toMatchSnapshot(); // Must run .merge
});
