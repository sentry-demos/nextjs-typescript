// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
require('dotenv-flow').config();

module.exports = {
  routes: './routes.ts',
  connector: '@layer0/next',
  backends: {
    origin: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'legacy.example.com.br',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'legacy.example.com.br',
    },
  },
  includeFiles: {
    '_content_cache/**/*': true,
  },
};
