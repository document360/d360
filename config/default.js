module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  cli: require('../package.json').name,
  env: {
    eu_baseUrl: "https://apihub.document360.io",
    us_baseUrl: "https://apihub.us.document360.io"
  }
};
