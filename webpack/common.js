/* eslint @typescript-eslint/no-var-requires: "off" */
const dotenv = require('dotenv')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')

module.exports = env => ({
  mode: env.mode,
  entry: './src/main/index',
  output: {
    clean: true,
    publicPath: env.publicPath,
    chunkFilename: '[id].[contenthash].js'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.ts', '.tsx', '.css']
  },
  devServer: {},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {}
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({ ...process.env }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ]
})
