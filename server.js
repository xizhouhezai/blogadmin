const request = require('request')

request('https://www.pwxcoo.com/dictionary?type=word&word=吴', (err, res, body) => {
  console.log('------------------------------')
  console.log(res)
  console.log('------------------------------')
  console.log(body)
})