function normalizeConfig(config) {
  return {
    strategy: config.strategy || {},

    types: {
      mode: (config.types || {}).mode || "add",
      list: (config.types || {}).list || []
    }
  };
}

export default normalizeConfig;
