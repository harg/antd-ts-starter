module.exports = function override(config, env) {
  // tsLoader
  const oneOf = config.module.rules.find((conf) => {
    return conf.oneOf;
  }).oneOf;
  const tsLoader = oneOf.find((conf) => {
    return conf.loader && conf.loader.includes('ts-loader');
  });
  tsLoader.loader = require.resolve('awesome-typescript-loader');
  tsLoader.query = {
    useBabel: true,
    useCache: true
  };

  // tsLint
  const tsLintLoader = config.module.rules.find((conf) => {
    return conf.loader && conf.loader.includes('tslint-loader');
  });
  tsLintLoader.options = tsLintLoader.options || {};
  // FIXED Warning: The 'no-use-before-declare' rule requires type infomation.
  tsLintLoader.options.typeCheck = true;

  // Less
  const rewireLess = require('react-app-rewire-less');
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      // '@primary-color': '#1DA57A', // Override primary color
      // '@font-family': 'Tahoma' // Override font name
      // ...
    }
  })(config, env);

  // MobX
  const rewireMobX = require('react-app-rewire-mobx');
  config = rewireMobX(config, env);

  const path = require('path');
  // For import with absolute path
  config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules);

  return config;
};
