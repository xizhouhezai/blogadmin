const DB = require('../db/db')

module.exports = function query(sql) {
  return new Promise((resolve, reject) => {
    DB.query(sql, (err, data) => {
      if (!err) {
        resolve(data)
        // DB.end()
      } else {
        reject(err)
      }
    })
  })
}
