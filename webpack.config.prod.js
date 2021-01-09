const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    bundle: './src/index.tsx',
  },
  target: 'web',
  resolve: {
    descriptionFiles: ['package.json'],
    modules: ['node_modules'],
    alias: {
      Assets: path.resolve(__dirname, './src/assets'),
      Audio: path.resolve(__dirname, './src/assets/audio'),
      Components: path.resolve(__dirname, './src/components'),
      Data: path.resolve(__dirname, './src/assets/data'),
      Images: path.resolve(__dirname, './src/assets/images'),
      Store: path.resolve(__dirname, './src/store'),
      Styles: path.resolve(__dirname, './src/styles'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      '...',
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env.production'),
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: 'dist',
    }),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      title: 'RSClone Tracking Time',
      favicon: './src/favicon.ico',
      template: './src/template.ejs',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(?:jpe?g|png)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(?:mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[hash][ext][query]',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
