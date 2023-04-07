module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  cli: require('../package.json').name,
  env: {
    eu_baseUrl: "https://apihub.dev.document360.net",
    us_baseUrl: "https://apihub.us.document360.io"
  }
};
