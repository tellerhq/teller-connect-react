const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');

module.exports = [
  // Base configuration
  {
    entry: './src/index.ts',
    externals: {
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      }
    },
    output: {
      path:  path.resolve(__dirname, path.dirname(pkg.main)),
      filename: path.basename(pkg.main),
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js|tsx|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
  },
  // UMD build with inline PropTypes
  {
    entry: './src/index.ts',
    externals: {
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      }
    },
    output: {
      path:  path.resolve(__dirname, path.dirname(pkg.browser)),
      filename: path.basename(pkg.browser),
      library: 'TellerConnect',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js|tsx|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
  },
  // Minified UMD Build without PropTypes
  {
    entry: './src/index.ts',
    externals: {
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM'
      }
    },
    output: {
      path:  path.resolve(__dirname, path.dirname(pkg['browser:min'])),
      filename: path.basename(pkg['browser:min']),
      library: 'TellerConnect',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js|tsx|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  },
];
