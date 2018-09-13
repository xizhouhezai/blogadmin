const Router = require('koa-router')
const router = new Router()

const upload = require('../util/upload')
const user = require('../model/user')
const content = require('../model/content')

router.post('/v1/auth', user.Auth)
router.get('/v1/login', user.Login)
router.post('/v1/sign', user.Sign)
router.get('/v1/articles', content.Article)
router.post('/v1/upload', upload.single('file'), content.Upload)

module.exports = router
