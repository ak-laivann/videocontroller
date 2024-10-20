const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const environment = process.env.NODE_ENV;

module.exports = {
  entry: {
    popup: path.resolve("./src/popup.tsx"),
    contentScript: path.resolve("./src/contentScript.js"),
  },
  devtool: "cheap-module-source-map",
  mode: environment,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("./manifest.json"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new HTMLPlugin({
      title: "HTML File",
      filename: "popup.html",
      chunks: ["popup"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
