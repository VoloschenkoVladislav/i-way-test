const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = env => ({
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: false,
  },
  plugins: [
    new Dotenv({
      path: '.env',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
    // new webpack.DefinePlugin({
    //   'process.env.BASE_BACKEND_URL': JSON.stringify(env.BASE_BACKEND_URL),
    // })
  ],
  resolve: {
    descriptionFiles: ['package.json'],
    extensions: ['...', '.json', '.jsx', '.js'],
    enforceExtension: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    port: '3000',
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
    proxy: [
      {
        context: ['/transnextgen'],
        target: 'https://transstage1.iwayex.com',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
});
