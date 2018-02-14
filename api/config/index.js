const configs = {
  development: {},
  production: {}
};

module.exports = configs[global.ENV || 'development'];
