const path = require('path');

module.exports = {
  entry: './client/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  }
};
