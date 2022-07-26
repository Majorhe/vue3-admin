import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import Login from '@/views/login'
import store from '@/store'

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
        path: '/home',
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
    {
        path: '/permission',
        name: 'permission',
        meta: {
            title: '权限管理'
        },
        component: Layout,
        children: [
            {
                path: '/menu',
                name: 'menu',
                meta: {
                    title: '菜单'
                },
                component: () => import('@/views/acl/menu')
            },
            {
                path: '/role',
                name: 'role',
                meta: {
                    title: '角色'
                },
                component: () => import('@/views/acl/role')
            },
            {
                path: '/account',
                name: 'account',
                meta: {
                    title: '管理员'
                },
                component: () => import('@/views/acl/account')
            }
        ]
    }
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