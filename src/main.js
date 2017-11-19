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


import Loading from '@/components/loading'; // Loading组件
Vue.use(Loading);


import store from './store/store.js'  // vuex配置


import axios from 'axios'  // axios请求
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接this.$http就可以了
//添加请求拦截器
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
    // 在发送请求之前做些什么
    store.dispatch('showLoading'); // 触发vuex的actions的'showLoading'，请求发送之前显示加载
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) { //配置请求回来的信息
    // 对响应数据做点什么
    store.dispatch('hideLoading'); // 数据请求回来之后，加载图标消失
    return response;
}, function (error) {
    return Promise.reject(error);
});



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



