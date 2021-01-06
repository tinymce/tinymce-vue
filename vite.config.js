const path = require('path');

module.exports = {
  root: 'src/demo',
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
  port: 3001
};