export default {
  dsn: 'https://edd83c9d84d54053a519f92f4f0951d0@sentry.lixinio.com/528',
  release: process.env.PROJECT_VERSION,
  logger: 'javascript',
  ignoreUrls: [/sentry\.cheanjiait\.com/, /hm\.baidu\.com/, /map\.qq\.com/],
  environment: process.env.RUN_ENV,
};
