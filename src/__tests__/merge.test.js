const Merge = require("../merge");

it("Еlements must clone", () => {
  const a = { key: 2 };
  const b = { key: 3 };

  const merger = new Merge({});

  merger.merge([a, b]);

  expect(a).toEqual({ key: 2 });
  expect(b).toEqual({ key: 3 });
});

describe("Normal work", () => {
  const cases = [
    // Select result type
    { elements: [{}], result: {} },
    { elements: [{}, {}], result: {} },
    { elements: [{}, []], result: [] },
    { elements: [[], {}], result: {} },
    { elements: [[], null], result: null },
    { elements: [{}, [], null, 0], result: 0 },
    () => {
      function fn() {}

      return { elements: [{}, [], fn], result: fn };
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
          array: "merge"
        }
      },

      elements: [{ a: [{}, { a: 5 }] }, { a: [{}, { a: 6 }] }],

      result: { a: [{}, { a: 6 }] }
    },
    {
      config: {
        strategy: {
          array: "concat"
        }
      },

      elements: [{ a: [{}, { a: 5 }] }, { a: [{}, { a: 6 }] }],

      result: { a: [{}, { a: 5 }, {}, { a: 6 }] }
    },
    {
      config: {
        strategy: {
          array: "replace"
        }
      },

      elements: [{ a: [{}, { a: 5 }] }, { a: [{}, { a: 6 }] }],

      result: { a: [{}, { a: 6 }] }
    }
  ];

  cases.forEach(c => {
    const { config, elements, result } = typeof c === "function" ? c() : c;

    const merger = new Merge(config || {});

    expect(merger.merge(...elements)).toEqual(result);
  });
});
