const configs = {
  development: {
    clientSecret: 'wz3jAKguMuMN',
    mailJet: {
      apiKey: '18b36c0843618ae057cb4a444f30297e',
      secret: '552a5cd2473ca1bbe6f7c9f0d716e77f',
    },
  },
  production: {
    clientSecret: 'hxcf6sDhJeHh',
    mailJet: {
      apiKey: '18b36c0843618ae057cb4a444f30297e',
      secret: '552a5cd2473ca1bbe6f7c9f0d716e77f',
    },
  }
};

module.exports = configs[global.ENV || 'development'];
