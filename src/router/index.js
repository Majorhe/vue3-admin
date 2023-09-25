import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import Login from '@/views/login'
import store from '@/store'
import permission from './permission'
import user from './user'
import work from './work'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        name: 'home',
        component: Layout,
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '数据看板'
                },
                component: () => import('@/views/home/dashboard')
            },
            {
                path: '/usercenter',
                name: 'usercenter',
                meta: {
                    title: '个人中心'
                },
                component: () => import('@/views/home/usercenter')
            },
            {
                path: '/workbench',
                name: 'workbench',
                meta: {
                    title: '工作台'
                },
                component: () => import('@/views/home/workbench')
            },
        ]
    },
    ...permission,
    ...user,
    ...work
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.getters['user/isLogin']) {
        next({ name: 'login' })
    } else {
        next()
    }
})


export default router