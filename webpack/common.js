/* eslint @typescript-eslint/no-var-requires: "off" */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({ ...process.env }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      minify: isProduction,
      cache: true
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : [])
  ]
})
