const koa = require('koa')
const bodyParse = require('koa-bodyparser')
const cors = require('koa2-cors')
const koaJwt = require('koa-jwt')

const secret = require('./config')
const router = require('./router')

const app = new koa()

app.use(bodyParse())
app.use(cors())
app.use(koaJwt({secret: secret.sign}).unless({
  path: [
    /^\/v1\/auth/,
    /^\/v1\/login/,
    /^\/v1\/sign/
  ]
}))

app.use(router.routes())

app.listen(3333, (err) => {
  if (!err) {
    console.log('server is running at 3333!!!!')
  }
})
