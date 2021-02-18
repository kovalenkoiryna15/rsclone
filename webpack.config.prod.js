const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const svgToMiniDataURI = require('mini-svg-data-uri');

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
      Entities: path.resolve(__dirname, './src/entities'),
      Images: path.resolve(__dirname, './src/assets/images'),
      State: path.resolve(__dirname, './src/state'),
      Styles: path.resolve(__dirname, './src/styles'),
      Utils: path.resolve(__dirname, './src/utils'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
  },
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
      path: path.resolve(__dirname, './.env.production.local'),
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
      favicon: './src/favicon.ico',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
      template: './src/template.ejs',
      title: 'RSClone Tracking Time',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: 'styles/[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        exclude: /node_modules|\.d\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader',
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
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
    ],
  },
};
