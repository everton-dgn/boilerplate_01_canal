/* eslint @typescript-eslint/no-var-requires: "off" */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const dotenv = require('dotenv')
const { DefinePlugin, EnvironmentPlugin } = require('webpack')

const isDevelopment = process.env.ENVIRONMENT === 'DEV'
const isProduction = process.env.ENVIRONMENT === 'PRD'

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
        use: {
          loader: 'swc-loader',
          options: {
            parseMap: true,
            jsc: {
              parser: { syntax: 'typescript', tsx: true },
              target: 'es2021',
              minify: { compress: isProduction },
              transform: {
                react: {
                  runtime: 'automatic',
                  refresh: isDevelopment
                }
              }
            },
            minify: true
          }
        }
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({ ...process.env }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : [])
  ]
})
