const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将js/css插入到HTML文件中
const nodeExternals = require('webpack-node-externals'); // 不打包node_modules内的文件
process.env.NODE_ENV = 'production' // babel-preset-react-app 需要 process.env.NODE_ENV

module.exports = [
// 客户端
{
  entry: {
    browser: './src/index.js', // 入口
  },
  output: {
    path: __dirname + '/build', // 输出地址
    filename: '[name].[chunkhash:8].js', // 输出的文件名称
  },
  resolve: {
    extensions: ['.js', '.jsx'], // import可省略文件后缀.js/.jsx
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [ // 打包文件时会从上到下找规则解析，一旦有符合规则就不再向下寻找
          // 打包js
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.join(__dirname, 'src'), // 只打包src目录下的
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-react-app')], // babel规则
              compact: true,
            },
          },
        ]
      }
    ],
  },
  plugins:[
    // 将生成的js/css插入到HTML中
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html'), // 初始HTML文件
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
}, 
// 服务端
{
  entry: {
    server: './server/index.js', // 服务端入口
  },
  output: {
    path: __dirname + '/build', // 输出地址
    filename: '[name].js', // 输出名称（server.js）服务端没有浏览器缓存，不用加hash
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 可省略文件后缀.js/.jsx
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [ // 打包文件时会从上到下找规则解析，一旦有符合规则就不再向下寻找
          // 打包js
          {
            test: /\.(js|jsx|mjs)$/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              presets: [require.resolve('babel-preset-react-app')], // babel规则
              compact: true,
            },
          },
        ]
      }
    ],
  },
  target: 'node', // nodejs环境
  externals: [nodeExternals()], // 不打包 node_modules
}]
