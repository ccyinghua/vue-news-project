'use strict'
// const LoadingComponent = require('./Loading.vue')
import LoadingComponent from './Loading.vue'

const loading = {
  install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
}
// module.exports = loading
export default loading
