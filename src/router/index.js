import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'  // 首页
import Follow from '@/components/Follow.vue'  // 关注
import Column from '@/components/Column.vue'  // 栏目
import UserInfo from '@/components/UserInfo.vue'  // "我的"
import Article from '@/components/Article.vue'  // 文章内容页

Vue.use(Router)

export default new Router({
  routes: [
    {
        path:'/home',   // 首页
        component:Home
    },
    {
        path:'/article/:id',   // 文章内容页
        component:Article
    },
    {
        path:'/follow',  // 关注
        component:Follow
    },
    {
        path:'/column',  // 栏目
        component:Column
    },
    {
        path:'/user-info',  // 我的
        component:UserInfo
    },
    {
        path:'*',  // 默认显示
        redirect:'/home'
    }
  ]
})
