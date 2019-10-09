const path = require('path');

module.exports = {
  entry: './client/testcode.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  }
};
