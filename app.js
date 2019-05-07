const koa = require('koa')
const bodyParse = require('koa-bodyparser')
const cors = require('koa2-cors')
const koaJwt = require('koa-jwt')
const static = require('koa-static')

const secret = require('./config')
const router = require('./router')

const app = new koa()

app.use(bodyParse({
  enableTypes: ['json', 'form', 'text']
}))

app.use(cors({
  origin: function (ctx) {
    return "*" // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 设置无序token验证的API
app.use(koaJwt({secret: secret.sign}).unless({
  path: [
    /^\/v1\/auth/,
    /^\/v1\/login/,
    /^\/v1\/sign/,
    /^\/v1\/upload/,
  ]
}))

app.use(router.routes())

app.use(static(__dirname + '/upload'))

app.listen(3333, (err) => {
  if (!err) {
    console.log('server is running at 3333!!!!')
  }
})
