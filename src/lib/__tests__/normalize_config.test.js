var normalizeConfig = require("../normalize_config");

it("Must be function", function() {
  expect(typeof normalizeConfig).toBe("function");
});

it("Must be throw error if config not equal object", function() {
  expect(normalizeConfig).toThrow();
  expect(normalizeConfig.bind(null, 4)).toThrow();
  expect(normalizeConfig.bind(null, null)).toThrow();
});

it("Must return default config", function() {
  expect(normalizeConfig({})).toMatchSnapshot();
});

it("Must set user config", function() {
  var config = {
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

it("Must validate configuration", function() {
  var cases = {
    normal: [
      {
        config: {
          types: {
            mode: "replace",
            list: [{}, {}]
          }
        },

        result: {
          strategy: {},

          types: {
            mode: "replace",
            list: [{}, {}]
          }
        }
      },
      {
        config: {},

        result: {
          strategy: {},

          types: {
            mode: "add",
            list: []
          }
        }
      },
      {
        config: {
          strategy: {
            array: "replace"
          }
        },

        result: {
          strategy: {
            array: "replace"
          },

          types: {
            mode: "add",
            list: []
          }
        }
      }
    ],

    incorrect: []
  };

  cases.normal.forEach(function(testCase) {
    expect(normalizeConfig(testCase.config)).toEqual(testCase.result);
  });

  cases.incorrect.forEach(function(testCase) {
    function callback() {
      normalizeConfig(testCase.config);
    }

    expect(callback).toThrowError(testCase.error);
  });
});
