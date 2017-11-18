// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'; // 引入jq

import '@/assets/js/font.js';   // 全局样式等文件
import '@/assets/css/reset.css';

import filters from './filters'  // 过滤
// console.log(filters)  // 结果：{normalTime: ƒ} filters暴露出来的是方法
// 而过滤器写法是Vue.filter(名字，函数)
// Vue.filter('money',function(value){
//     return '￥'+value.toFixed(2);  //两位小数
// })
// 循环遍历导入的过滤方法json，改成Vue.filter(名字,函数)形式
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))


import axios from 'axios'
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



