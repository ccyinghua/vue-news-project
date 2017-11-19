## vue-news-project

> 智能社vue2.0实例，新闻项目，vue+router+axios+vuex

### Build Setup

```javascript
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build


```
### 构建项目

```javascript
#全部引入#：

vue init webpack vue-news-project
cnpm install
npm run dev

cnpm install vuex axios --save-dev

cnpm install jquery --save-dev

```

- Nav.vue--头部
- router部分
    - Home.vue--首页
        -  Banner.vue--轮播banner
    - Follow.vue--头部"关注"部分
    - Column.vue--头部"栏目"部分
    - UserInfo.vue--底部"我的"部分
    - Article.vue--文章内容页
- Footer.vue--底部


#### 一、router路由

Nav.vue

```html
<router-link tag="li" to="/home" active-class="active">
    <a href="javascript:;">首页</a>
</router-link>
<router-link tag="li" to="/follow" active-class="active">
    <a href="javascript:;">关注</a>
</router-link>
<router-link tag="li" to="/column" active-class="active">
    <a href="javascript:;">栏目</a>
</router-link>
```
App.vue

```html
<!--组件将渲染在这里-->
<router-view></router-view>

```

main.js

```javascript
import router from './router'

/* eslint-disable no-new */
new Vue({
  router
})

```
router/index.js

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Follow from '@/components/Follow.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path:'/home',   // 首页
        component:Home
    },
    {
        path:'/follow',  // 关注
        component:Follow
    },
    {
        path:'*',  // 默认显示
        redirect:'/home'
    }
  ]
})
```
#### 二、引入JQ


```javascript
>> 安装
cnpm install jQuery --save-dev

>> build/webpack.base.conf.js中：
var webpack=require('webpack');
plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    })
]

>> main.js
import $ form 'jquery'

```
#### 三、axios请求数据


```javascript
>> main.js
import axios from 'axios'
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了

>> vue文件
data(){
    return {
        arrList:[]
    }
},
mounted(){
    // 获取数据
    this.fetchData();
},
methods:{
    fetchData(){
        var _this = this;
        this.$http.get('src/data/index.data').then(function(res){
            _this.arrList = res.data;
        }).catch(function(err){
            console.log(err);
        })
    }
}
```
#### 四、列表页跳到对应内容页

Home.vue 列表页
```html
<!--以item的id值作为url链接的区分-->
<li v-for="(item,index) in arrList">
    <router-link :to="'/article/'+item.id">
        <h2>{{item.title}}</h2>
        <p>{{item.detail}}</p>
    </router-link>
</li>

```
Article.vue 内容页

```javascript
// 根据url中id的不同获取内容显示的不同数据
// $route.path获取url链接
export default{
    data(){
        return {
            articleData:{}
        }
    },
    mounted(){
        var reg = /\/article\/(\d+)/;
        // alert(this.$route.path);  // /article/1
        // alert(this.$route.path.match(reg));  // /article/1,1
        var id = this.$route.path.match(reg)[1]; // 1
        //获取数据
        this.fetchData(id);
    },
    methods:{
        fetchData(id){
            var _this=this;
            this.$http.get('src/data/article.data').then(function(res){
                //console.log(res.data[id]);
                _this.articleData=res.data[id-1];
            }).catch(function(err){
                console.log('文章详细页面:',err);
            })
        }
    }
}

```

router/index.js  路由配置

```javascript
import Article from '@/components/Article.vue'

export default new Router({
  routes: [
    {
        path:'/article/:id',   // 文章内容页
        component:Article
    }
  ]
})
```
#### 五、过滤器filters使用

Article.vue时间显示
```
<!-- normalTime 过滤器的名称，对articleData.time进行处理 -->
<p>{{articleData.time | normalTime}}</p>

```
filters文件夹

```javascript
>> filters/timeFormat.js

export const normalTime=(time)=>{
    if(time){
    	var oDate=new Date();
    	oDate.setTime(time);
    
    	var y=oDate.getFullYear();
    	var m=oDate.getMonth()+1;
    	var d=oDate.getDate();
    
    	var h=oDate.getHours();
    	var mm=oDate.getMinutes();
    	var s=oDate.getSeconds();
    
    	return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
    }
}

>> filters/index.js

import {normalTime} from './timeFormat.js';
//console.log(normalTime)
// 以json形式导出过滤的方法{normalTime: ƒunction...}
export default{
    normalTime
}
```
main.js

```javascript
import filters from './filters'  // 过滤
// console.log(filters)  // 结果：{normalTime: ƒ} filters暴露出来的是方法
// 而过滤器写法是Vue.filter(名字，函数)
// Vue.filter('money',function(value){
//     return '￥'+value.toFixed(2);  //两位小数
// })
// 循环遍历导入的过滤方法json，改成Vue.filter(名字,函数)形式
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
```
#### 六、添加Loading加载组件

Loading组件此处使用自定义全局Loading组件，详见：[https://github.com/ccyinghua/custom-global-component](https://github.com/ccyinghua/custom-global-component)

```
>> main.js
import Loading from './components/loading'; // Loading组件
Vue.use(Loading);

>> App.vue
<div id="app">
    <loading></loading>
</div>
```



#### 七、vuex的使用 [https://vuex.vuejs.org/zh-cn/](https://vuex.vuejs.org/zh-cn/)

- mapActions   管理所有的事件（行为）<br>
- mapGetters   获取数据，将store的getters映射到计算属性

`loading`组件需要在页面请求之前显示，请求完成之后消失。<br>
头部组件`NavView`需要在点击"我的"页面时隐藏

vuex的配置都在store文件夹的store.js
```javascript
>> App.vue

<loading v-show="loading"></loading>
<NavView v-show="headerShow"></NavView>

import {mapGetters,matpActions} from 'vuex'
export default {
    computed:mapGetters([
        'headerShow',
        'loading'
    ])
}

>> main.js
import store from './store/store.js'    
new Vue({
  store
})
```

Loading的出现与消失

```javascript
>> main.js 添加axios配置

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
```


隐藏NavView组件

```javascript
>> App.vue
watch:{
    $route(to,from){   //监听路由变化，点击"我的"时隐藏头部
        // console.log(to.path);
        if(to.path == '/user-info'){
            this.$store.dispatch('hideHeader'); // 触发vuex的actions的'hideHeader'
        }else{
            this.$store.dispatch('showHeader');
        }
    }
},
```







