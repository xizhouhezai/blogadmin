const jwt = require('jsonwebtoken')

const { encrypt } = require('../util/md5')
const secret  = require('../config')
const { codeMessage } = require('../config')
const query = require('../db/query')

module.exports = {
  async Auth(ctx) {
    const user = ctx.request.body

    console.log(user)

    const res = await query(`select id, username from ls_user where username='${user.name}'`)
    console.log(res)
    if (res.length && res[0].username) {
      let userToken = {
        id: res[0].id,
        name: res[0].username
      }
      const token = jwt.sign(userToken, secret.sign, {expiresIn: '7d'})  //token签名 有效期为1小时
      ctx.body = {
          message: '获取token成功',
          code: codeMessage.SUCCESSCODE,
          token
      }
    } else {
      ctx.body = {
        message: '参数错误',
        code: codeMessage.ERRCODE
      }
    }
  },
  async Login(ctx) {
    const token = ctx.header.authorization
    if (token) {
      jwt.verify(token, secret.sign, (err, decode) => {
        if (!err) {
          ctx.body = {
            decode
          }
        } else {
          ctx.body = {
            message: 'token 失效',
            code: codeMessage.ERRCODE
          }
        }
      })
    }
  },
  async Sign(ctx) {
    const user = ctx.request.body

    const res = await query(`select username, password from ls_user where username='${user.name}'`)

    if (res.length) {
      ctx.body = {
        code: codeMessage.ERRCODE,
        message: 'username already exists'
      }
    } else {
      let pass = encrypt(user.password)
      await query(`insert into ls_user (username, password) value ('${user.name}','${pass}')`)
      ctx.body = {
        code: codeMessage.SUCCESSCODE,
        message: 'registration success'
      }
    }
  }
}