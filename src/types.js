import nanoclone from "nanoclone";

function set(force, elements) {
  return force ? nanoclone(elements) : elements;
}

const types = [
  {
    name: "primitive",

    is(el) {
      const type = typeof el;

      return type === "number" || type === "string" || type === "boolean";
    },

    default: "default",

    merge: {
      default(merger, config, a, b) {
        return set(config.force, b);
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
      deep(merger, config, a, b) {
        const keys = {
          a: Object.keys(a),
          b: Object.keys(b)
        };

        return set(
          config.set,
          [...keys.a, ...keys.b].reduce(
            (result, key) =>
              Object.assign(result, { [key]: merger(a[key], b[key]) }),
            {}
          )
        );
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
      merge(merger, config, a, b) {
        const result = [];

        for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
          result.push(merger(a[i], b[i]));
        }

        return result;
      },

      replace(merger, config, a, b) {
        return set(config.force, b);
      },

      concat(merger, config, a, b) {
        return set(config.force, [...a, ...b]);
      }
    }
  }
];

export default types;
