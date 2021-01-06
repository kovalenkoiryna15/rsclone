const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: './components/index.tsx',
  },
  target: 'web',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: 'dist',
    }),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      title: 'RSClone TrackingTime',
      template: './components/template.ejs',
      filename: './components/index.html',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
      },
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: './favicon.ico',
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      },
    ),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(?:jpe?g|png)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(?:mp3|wav)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[hash][ext][query]',
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
    ],
  },
};
