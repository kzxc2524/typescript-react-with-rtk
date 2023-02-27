const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const DotEnv = require("dotenv-webpack");

require("dotenv").config();


module.exports = merge(common, {
  mode: process.env.MODE,
  devtool: "inline-source-map",
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: process.env.PORT,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
