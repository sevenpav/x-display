const path = require('path')

const dirs = {
  src: path.resolve('./src'),
  dist: path.resolve('./dist'),
  layouts: path.resolve('./src/views/layouts'),
  pages: path.resolve('./src/views/pages'),
  components: path.resolve('./src/views/components')
}

module.exports = dirs
