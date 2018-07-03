import nanoclone from "nanoclone";

import types from "./types";
import normalizeConfig from "./lib/normalize_config";

class Merge {
  constructor(config) {
    this.config = normalizeConfig(config);

    this.types = (this.config.types.mode === "add" ? types : []).concat(
      this.config.types.list
    );
  }

  determineType(a, b) {
    for (let i = this.types.length - 1; i >= 0; i -= 1) {
      const type = this.types[i];

      if (type.is(a) && type.is(b)) {
        return type;
      }
      if (type.is(a) || type.is(b)) {
        break;
      }
    }

    return null;
  }

  step(a, b) {
    if (b === undefined) {
      return nanoclone(a);
    }

    const type = this.determineType(a, b);

    if (!type) {
      return nanoclone(b);
    }

    const strategy = this.config.strategy[type.name] || type.default;

    return type.merge[strategy](this.step.bind(this), a, b);
  }

  merge(...elements) {
    let result;

    for (let i = elements.length; i > 0; i -= 1) {
      result = this.step(elements.pop(), result);
    }

    return result;
  }
}

export default Merge;
