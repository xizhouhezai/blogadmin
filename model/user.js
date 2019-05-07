const jwt = require('jsonwebtoken')

const { encrypt } = require('../util/md5')
const secret  = require('../config')
const { codeMessage } = require('../config/info')
const query = require('../db/query')

module.exports = {
  // 获取token post方法
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
      // 设置token包括的返回信息以及过期时间
      const token = jwt.sign(userToken, secret.sign, {expiresIn: '7d'})
      ctx.body = {
        message: 'get the token successfully',
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
    const user = ctx.query

    let pass = encrypt(user.password)
    const res = await query(`select username, password from ls_user where username='${user.name}'`)

    if (res.length && res[0].password === pass) {
      ctx.body = {
        message: 'login successful',
        code: codeMessage.SUCCESSCODE,
        data: res[0]
      }
    } else {
      ctx.body = {
        message: 'login failed',
        code: codeMessage.ERRCODE
      }
    }
    // 解析token
    // const token = ctx.header.authorization
    // if (token) {
    //   jwt.verify(token, secret.sign, (err, decode) => {
    //     if (!err) {
    //       ctx.body = {
    //         decode
    //       }
    //     } else {
    //       ctx.body = {
    //         message: 'token 失效',
    //         code: codeMessage.ERRCODE
    //       }
    //     }
    //   })
    // }
  },
  async Sign(ctx) {
    const user = ctx.request.body

    console.log(user)

    const res = await query(`select username, password from ls_user where username='${user.name}'`)

    if (res.length) {
      ctx.body = {
        code: codeMessage.ERRCODE,
        message: 'username already exists'
      }
    } else {
      let pass = encrypt(user.password)
      await query(`insert into ls_user (username, password) value ('${user.name}','${pass}')`)
      const getUser = await query(`select id, username from ls_user where username='${user.name}'`)
      let userToken = {
        id: getUser[0].id,
        name: getUser[0].username
      }
      // 设置token包括的返回信息以及过期时间
      const token = jwt.sign(userToken, secret.sign, {expiresIn: '7d'})

      ctx.body = {
        code: codeMessage.SUCCESSCODE,
        message: 'registration success',
        token
      }
    }
  }
}