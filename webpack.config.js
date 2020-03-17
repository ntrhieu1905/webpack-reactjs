const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: "[name]_[local]_[hash:base64]",
          sourceMap: true,
          minimize: true
        }
      }, 
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    compress: true,
    hot: true,
    stats: {
      preset: 'minimal',
      children: false,
      moduleTrace: true,
      errorDetails: true
    }
    // inline: false,
    // overlay: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico'
    })
  ]
};