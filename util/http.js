const axios = require('axios')

exports.get = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      resolve(res)
    })
  })
}