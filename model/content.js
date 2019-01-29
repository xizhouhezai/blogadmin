const query = require('../db/query')

module.exports = {
  async Article(ctx) {
    ctx.body = {
      code: 1
    }
  },
  async Upload(ctx) {
    let baseUrl = 'http://localhost:3333'
    let path = ctx.req.file.destination
    path = path.split('/')
    path = path.slice(2, path.length)
    let imgUrl = ''

    path.forEach(item => {
      imgUrl += '/' + item
    });

    let url = baseUrl + imgUrl + '/' + ctx.req.file.filename

    ctx.body = {
      code: 1,
      pictureUrl: url
    }
  },
  async category(ctx) {
    const { user_id, name, slug, description, type } = ctx.request.body
    const res = query(`insert into ls_meta (user_id, name, slug, description, type) value (${user_id},'${name}','${slug}','${description}','${type}')`)
  }
}
