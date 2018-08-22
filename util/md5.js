const util = require('utility')

module.exports = {
  encrypt(pass) {
    const salt = 'kdjfkdjdkfjlmk%?*~782jkm'
    pass = pass + salt
    return util.md5(util.md5(pass))
  }
}
