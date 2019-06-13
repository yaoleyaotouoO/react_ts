var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const optimization = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: false
          }
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: false
  }
};

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: "./index.tsx"
  },
  output: {
    filename: '[name].js',
    path: __dirname + "/dist",
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@util': path.resolve(__dirname, "src/util")
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
  },
  module: {
    rules: [{
      test: /(\.js)|(\.jsx)|(\.ts)|(\.tsx)$/,
      exclude: /node_modules/,
      include: /src/,
      loader: 'babel-loader'
    },
    // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
    {
      test: /\.tsx?$/,
      include: /src/,
      loader: "ts-loader"
    },
    {
      test: /\.css$/,
      exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src/assets/style')],
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'typings-for-css-modules-loader',
        options: {
          modules: true,
          namedExport: true,
          localIdentName: '[local]__[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader'
      }
      ]
    },
    {
      test: /\.css$/,
      include: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src/assets/style')],
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: false
        },
      },
      {
        loader: 'postcss-loader'
      }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
      include: /src/,
      loader: 'file-loader',
      options: {
        name: 'img/styleResource/[name].[ext]'
      }
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      chunks: ['app'],
      template: 'index.html',
      filename: 'index.html'
    })
  ]
};