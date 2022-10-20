// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
require('dotenv-flow').config();

module.exports = {
  routes: './routes.ts',
  connector: '@layer0/next',
  backends: {
    origin: {
      domainOrIp: 'legacy.example.com.br',
      hostHeader: 'legacy.example.com.br',
    },
  },
};
