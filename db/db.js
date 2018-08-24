const { mysql } = require('../config')
const Mysql = require('mysql')

const client = Mysql.createConnection({
  ...mysql
})

client.connect((err) => {
  if (!err) {
    console.log('数据库链接成功！！！！！')
  }
})

module.exports = client
