var Merge = require("../merge");

jest.mock("../merge", function() {
  var FakeMerge = jest.fn();

  FakeMerge.prototype.merge = jest.fn();

  return FakeMerge;
});

var nanomerge = require("../.");

afterEach(function() {
  Merge.mockClear();
  Merge.prototype.merge.mockClear();
});

describe("#()", function() {
  it("Must to create Merge", function() {
    expect(Merge.mock.calls).toMatchSnapshot();
  });

  it("Must run Merge.merge", function() {
    nanomerge({}, {}, {});
    nanomerge([], []);
    nanomerge([], [], {});

    expect(Merge.prototype.merge.mock.calls).toMatchSnapshot(); // Must run .merge
  });
});

describe("#create()", function() {
  it("Must be function", function() {
    expect(typeof nanomerge.create).toBe("function");
  });

  it("Must be throw error if config not equal object", function() {
    expect(nanomerge.create).toThrow();
    expect(nanomerge.create.bind(null, 4)).toThrow();
    expect(nanomerge.create.bind(null, null)).toThrow();
  });

  it("Must not create new Merge immediately", function() {
    expect(Merge.mock.calls).toMatchSnapshot();
  });

  it("Must create new Merge by a call", function() {
    nanomerge.create({});

    expect(Merge.mock.calls).toMatchSnapshot();
  });

  it("Must run Merge.merge", function() {
    var merger = nanomerge.create({});

    merger({}, {}, {});
    merger([], []);
    merger([], [], {});

    expect(Merge.prototype.merge.mock.calls).toMatchSnapshot(); // Must run .merge
  });
});
