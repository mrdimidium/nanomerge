import Merge from "../merge";

import nanomerge from "..";

jest.mock("../merge", () => {
  const FakeMerge = jest.fn();

  FakeMerge.prototype.merge = jest.fn();

  return FakeMerge;
});

afterEach(() => {
  Merge.mockClear();
  Merge.prototype.merge.mockClear();
});

describe("#()", () => {
  it("Must to create Merge", () => {
    expect(Merge.mock.calls).toMatchSnapshot();
  });

  it("Must run Merge.merge", () => {
    nanomerge({}, {}, {});
    nanomerge([], []);
    nanomerge([], [], {});

    expect(Merge.prototype.merge.mock.calls).toMatchSnapshot(); // Must run .merge
  });
});

describe("#create()", () => {
  it("Must be function", () => {
    expect(typeof nanomerge.create).toBe("function");
  });

  it("Must be throw error if config not equal object", () => {
    expect(nanomerge.create).toThrow();
    expect(nanomerge.create.bind(null, 4)).toThrow();
    expect(nanomerge.create.bind(null, null)).toThrow();
  });

  it("Must not create new Merge immediately", () => {
    expect(Merge.mock.calls).toMatchSnapshot();
  });

  it("Must create new Merge by a call", () => {
    nanomerge.create({});

    expect(Merge.mock.calls).toMatchSnapshot();
  });

  it("Must run Merge.merge", () => {
    const merger = nanomerge.create({});

    merger({}, {}, {});
    merger([], []);
    merger([], [], {});

    expect(Merge.prototype.merge.mock.calls).toMatchSnapshot(); // Must run .merge
  });
});
