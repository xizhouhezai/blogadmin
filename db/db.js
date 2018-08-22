const { mysql } = require('../config')
const Mysql = require('mysql')

const client = Mysql.createConnection({
  ...mysql
})

client.connect((err) => {
  if (!err) {
    console.log('链接成功！！！！！')
  }
})

module.exports = client
