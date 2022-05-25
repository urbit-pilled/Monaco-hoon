const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  entry: __dirname + "/index.js",
  devServer: {
    static: './',
    compress: true,
    port: 9000
  },
  output: {
    filename: "bundle.js",
    publicPath: "dist/"
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        loader: "file-loader",
        type: "javascript/auto",
        options: {
          publicPath: "dist/"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    fallback: {
      path: require.resolve( 'path-browserify' ),
      fs: false
    }
  },
  mode: 'development'
};
