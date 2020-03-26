import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
            path: '/',
            redirect: '/login'
    },
    {
            path: '/login',
            component: resolve => require(['../components/view/Login.vue'], resolve)
    },
    {
            path: '*',
            redirect: '/404'
    },
    {
            path: '/home',
            component: resolve => require(['../components/public/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
							///数据概况
                {
                     path: '/dashboard',
                     component: resolve => require(['../components/view/Dashboard.vue'], resolve),
                     meta: { title: '首页' },
                },
                {
                     path: '/baseTable',
                     component: resolve => require(['../components/view/table/BaseTable.vue'], resolve),
                     meta: { title: '表一' },
                },
            ]
    }
  ]
})
