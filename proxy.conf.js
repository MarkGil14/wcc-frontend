require('dotenv').config();
const API_TARGET = process.env.PROXY_API_URL || "http://localhost:3100";

const PROXY_CONFIG = [
  {
    context: ["/wcc-api"],
    target: API_TARGET,
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
      "^/wcc-api": ""
    }
  }
];

module.exports = PROXY_CONFIG;
