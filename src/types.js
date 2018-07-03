import nanoclone from "nanoclone";

const types = [
  {
    name: "primitive",

    is(el) {
      const type = typeof el;

      return type === "number" || type === "string" || type === "boolean";
    },

    default: "default",

    merge: {
      default(merger, a, b) {
        return b;
      }
    }
  },

  {
    name: "object",

    is(el) {
      return el !== null && typeof el === "object";
    },

    default: "deep",

    merge: {
      deep(merger, a, b) {
        const result = {};

        const keys = {
          a: Object.keys(a),
          b: Object.keys(b)
        };

        keys.a.concat(keys.b).forEach(key => {
          result[key] = merger(a[key], b[key]);
        });

        return result;
      }
    }
  },

  {
    name: "array",

    is(el) {
      return Array.isArray(el);
    },

    default: "replace",

    merge: {
      merge(merger, a, b) {
        const result = [];

        for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
          result.push(merger(a[i], b[i]));
        }

        return result;
      },

      replace(merger, a, b) {
        return nanoclone(b);
      },

      concat(merger, a, b) {
        return [].concat(a).concat(b);
      }
    }
  }
];

export default types;
