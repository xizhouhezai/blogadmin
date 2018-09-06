import Http from './http'
import apis from '../config/apis'

export default {
  install (Vue) {
    Vue.use(new Http(apis))
  }
}
