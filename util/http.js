const axios = require('axios')

exports.get = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res)
    })
  })
}