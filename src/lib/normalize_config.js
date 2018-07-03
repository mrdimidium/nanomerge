function normalizeConfig(config) {
  if (config === null || typeof config !== "object") {
    throw new Error("Config must be a object");
  }

  return {
    strategy: config.strategy || {},

    types: {
      mode: (config.types || {}).mode || "add",
      list: (config.types || {}).list || []
    }
  };
}

module.exports = normalizeConfig;
