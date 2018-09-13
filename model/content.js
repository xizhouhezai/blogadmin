module.exports = {
  async Article(ctx) {
    ctx.body = {
      code: 1
    }
  },
  async Upload(ctx) {
    // let data = await getImage(ctx)
    console.log(ctx.req.file)
    let baseUrl = 'http://localhost:3333'
    let path = ctx.req.file.destination
    path = path.split('/')
    path = path.slice(2, path.length)
    let imgUrl = ''

    path.forEach(item => {
      imgUrl += '/' + item
    });

    let url = baseUrl + imgUrl + '/' + ctx.req.file.filename

    console.log(url)
    ctx.body = {
      code: 1,
      pictureUrl: url
    }
  }
}

// function getImage(ctx) {
//   var form = formidable.parse(ctx.request)
//   return new Promise((resolve, reject) => {

//     bluebird.promisify(form.parse)

//     form((opt, obj) => {
//       console.log(opt)
//       resolve(obj);//{ name: base64字符串 }
//     })
//   })
// }
