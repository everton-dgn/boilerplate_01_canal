/* eslint @typescript-eslint/no-var-requires: "off" */
require('dotenv').config()
const common = require('./common')

module.exports = common({
  mode: 'development',
  port: process.env.PORT,
  publicPath: `${process.env.PUBLIC_PATH}:${process.env.PORT}`
})
