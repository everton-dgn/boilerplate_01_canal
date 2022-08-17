module.exports = {
  entry: './src/main/index',
  output: {
    clean: true,
    publicPath: ''
  },
  resolve: {
    modules: ['src', 'node_modues'],
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
  plugins: []
}
