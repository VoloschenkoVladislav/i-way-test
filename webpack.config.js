const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HTMLWebpackPlugin({
    //   template: './public/index.html',
    //   cache: false,
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
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
};
