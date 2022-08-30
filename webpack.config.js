const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config({ path: './.env' });

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src/client/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: 'styles.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
      favicon: './src/client/favicon.png',
    }),
  ],
};
