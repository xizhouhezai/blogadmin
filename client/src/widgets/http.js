import axios from 'axios'

export default class Http {
  constructor (apis) {
    this.apis = apis
    console.log(this)
  }
  install (Vue) {
    let self = this
    Vue.prototype.$http = {
      get (options) {
        let newOptions = Object.assign(options, {
          method: 'GET'
        })
        return new Promise((resolve, reject) => {
          self.request(newOptions, resolve, reject)
        })
      },
      post (options) {
        let newOptions = Object.assign(options, {
          method: 'POST'
        })
        return new Promise((resolve, reject) => {
          self.request(newOptions, resolve, reject)
        })
      }
    }
  }
  request (options, resolve, reject) {
    const { name, method, params, data } = options
    let baseUrl = 'http://localhost:3333/v1/'
    let uri = ''
    Object.keys(this.apis).forEach(key => {
      if (key === name) {
        console.log(name)
        uri = this.apis[name].uri
      }
    })

    let url = baseUrl + uri

    let sOptions = {}

    if (method === 'GET' && params) {
      sOptions = {
        params: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    } else if (data) {
      sOptions = data
    }

    let sMethod = method.toLowerCase()

    console.log(url)
    console.log(sMethod)
    axios[sMethod](url, sOptions).then((res) => {
      resolve(res.data)
    }).catch(err => {
      if (err) {
        reject(err)
      }
    })
  }
}
