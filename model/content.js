const { codeMessage } = require('../config/info')
const query = require('../db/query')
const { get } = require('../util/http')

module.exports = {
  async Article(ctx) {
    ctx.body = {
      code: 1
    }
  },
  async XinHua(ctx) {
    const { type, abbreviation, riddle, word } = ctx.query
    const baseUrl = 'https://www.pwxcoo.com/dictionary'
    let url = ''

    if (abbreviation) {
      url = `${baseUrl}?type=${type}&abbreviation=${abbreviation}`
    } else if (riddle) {
      url = `${baseUrl}?type=${type}&riddle=${riddle}`
    } else if (word) {
      url = `${baseUrl}?type=${type}&word=${word}`
    }
    console.log('url----------------------------')
    console.log(url)
    console.log('url----------------------------')
    const res = await get(url)
    console.log(res.data.length)
    ctx.body={
      message: res.data
    }
  }
}
