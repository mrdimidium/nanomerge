import nanoclone from "nanoclone";

var types = [
  {
    name: "primitive",

    is: function(el) {
      var type = typeof el;

      return type === "number" || type === "string" || type === "boolean";
    },

    default: "default",

    merge: {
      default: function(merger, a, b) {
        return b;
      }
    }
  },

  {
    name: "object",

    is: function(el) {
      return el !== null && typeof el === "object";
    },

    default: "deep",

    merge: {
      deep: function(merger, a, b) {
        var result = {};

        var keys = {
          a: Object.keys(a),
          b: Object.keys(b)
        };

        keys.a.concat(keys.b).forEach(function(key) {
          result[key] = merger(a[key], b[key]);
        });

        return result;
      }
    }
  },

  {
    name: "array",

    is: function(el) {
      return Array.isArray(el);
    },

    default: "replace",

    merge: {
      merge: function(merger, a, b) {
        var result = [];

        for (var i = 0; i < Math.max(a.length, b.length); ++i) {
          result.push(merger(a[i], b[i]));
        }

        return result;
      },

      replace: function(merger, a, b) {
        return nanoclone(b);
      },

      concat: function(merger, a, b) {
        return [].concat(a).concat(b);
      }
    }
  }
];

export default types;
