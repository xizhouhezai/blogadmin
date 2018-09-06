const { codeMessage } = require('../config/info')
const query = require('../db/query')

module.exports = {
  async Article(ctx) {
    ctx.body = {
      code: 1
    }
  }
}
