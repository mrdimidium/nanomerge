function normalizeConfig(config) {
  return {
    force: config.force || false,

    strategy: config.strategy || {},

    types: {
      mode: (config.types || {}).mode || "add",
      list: (config.types || {}).list || []
    }
  };
}

export default normalizeConfig;
