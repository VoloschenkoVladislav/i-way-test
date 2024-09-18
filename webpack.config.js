const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'sass-loader'],
      },
    ],
  },
  // devServer: {
  //   port: process.env.DEV_SERVER_PORT,
  //   open: true,
  //   historyApiFallback: {
  //     index: 'index.html',
  //   },
  //   proxy: {
  //     '/v3': process.env.SERVER_ADDRESS,
  //   },
  // },
};
