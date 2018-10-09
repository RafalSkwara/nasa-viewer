const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');


module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: ['react-dev-utils/webpackHotDevClient', path.resolve('src/index.js')],

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },


  output: {
    path: path.resolve('.tmp'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve('public/index.html'),
    }),
  ],

  devServer: {
    contentBase: '.tmp',
    hot: true,
    port: 3000,
    historyApiFallback: true
  },

  module: {
    rules: [
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      // },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: ["@babel/env", "@babel/react"],
          }
        }]
      },
      {
        test: /\.(scss|sass)$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 10',
                  ],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
	  },
		
      {
        test: /\.(jpe?g|svg|png|gif|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        }, ],
      },
      {
		  test: /\.html$/,
        use: [{
		  loader: 'html-loader',
          options: {
            name: '[name].[ext]',
			outputPath: 'assets/',
			attrs: ['video:src']
          },
        }, ],
      },
      {
		  test: /\.mp4$/,
        use: [{
			loader: 'url-loader',
          options: {
            name: '[name].[ext]',
			outputPath: 'assets/',
			mimetyoe: 'video/mp4',
			limit: 40000
          },
        }, ],
      },
    ],
  },
};
