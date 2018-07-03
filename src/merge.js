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
      return this.config.force ? nanoclone(a) : a;
    }

    const type = this.determineType(a, b);

    if (!type) {
      return this.config.force ? nanoclone(b) : b;
    }

    const strategy = this.config.strategy[type.name] || type.default;
    const merge = this.step.bind(this);
    const config = { force: this.config.force };

    return type.merge[strategy](merge, config, a, b);
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
