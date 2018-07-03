import normalizeConfig from "../normalize_config";

it("Must be function", () => {
  expect(typeof normalizeConfig).toBe("function");
});

it("Must return default config", () => {
  expect(normalizeConfig({})).toMatchSnapshot();
});

it("Must set user config", () => {
  const config = {
    strategy: {
      array: "replace"
    },

    types: {
      mode: "replace",
      list: [{}]
    }
  };

  expect(normalizeConfig(config)).toMatchSnapshot();
});

describe("Must validate configuration", () => {
  const cases = {
    empty: {},
    types: {
      types: {
        mode: "replace",
        list: [{}, {}]
      }
    },
    strategy: {
      strategy: {
        array: "replace"
      }
    },
    force: {
      force: true
    }
  };

  Object.keys(cases).forEach(testCaseName => {
    it(`Must set ${testCaseName}`, () => {
      expect(normalizeConfig(cases[testCaseName])).toMatchSnapshot();
    });
  });
});
