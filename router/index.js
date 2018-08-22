const Router = require('koa-router')
const router = new Router()

const user = require('../model/user')

router.post('/v1/auth', user.Auth)
router.get('/v1/login', user.Login)
router.post('/v1/sign', user.Sign)

module.exports = router
