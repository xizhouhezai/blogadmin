const formidable = require('koa-formidable')

const { codeMessage } = require('../config/info')
const query = require('../db/query')

module.exports = {
  async Article(ctx) {
    ctx.body = {
      code: 1
    }
  },
  async Upload(ctx) {
    // let form = formidable.parse(ctx.request);
    // console.log(ctx.request)
    // let url = await formImage(form)
    // console.log(url)
    ctx.body = {
      code: 1
    }
  }
}

function formImage(form) {
  return new Promise((resolve, reject) => {
    form((opt, {fields, files})=> {
      console.log(fields)
      console.log(files)
    })
  })
}
