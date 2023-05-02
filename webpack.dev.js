const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = () => {
  return merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: ['react-devtools', './src/content.tsx'],
  })
}
