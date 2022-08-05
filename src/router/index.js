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
        path: '/account',
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
                component: () => import('@/views/menu')
            },
            {
                path: '/role',
                name: 'role',
                meta: {
                    title: '角色'
                },
                component: () => import('@/views/role')
            },
            {
                path: '/account',
                name: 'account',
                meta: {
                    title: '管理员'
                },
                component: () => import('@/views/account')
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '用户管理'
        },
        component: Layout,
        children: [
            {
                path: '/user',
                name: 'userList',
                meta: {
                    title: '用户列表'
                },
                component: () => import('@/views/user')
            },
        ]
    },
    {
        path: '/works',
        name: 'works',
        meta: {
            title: '作品管理'
        },
        component: Layout,
        children: [
            {
                path: '/works/list',
                name: 'worksList',
                meta: {
                    title: '作品列表'
                },
                component: () => import('@/views/works')
            },
            {
                path: '/token',
                name: 'token',
                meta: {
                    title: '通证列表'
                },
                component: () => import('@/views/token')
            },
            {
                path: '/category',
                name: 'category',
                meta: {
                    title: '分类管理'
                },
                component: () => import('@/views/category')
            },
            {
                path: '/issued',
                name: 'issued',
                meta: {
                    title: '发售日历'
                },
                component: () => import('@/views/issued')
            }
        ]
    },
    {
        path: '/activity',
        name: 'activity',
        meta: {
            title: '活动管理'
        },
        component: Layout,
        children: [
            {
                path: '/activity/list',
                name: 'activityList',
                meta: {
                    title: '活动列表'
                },
                component: () => import('@/views/activity')
            },
            {
                path: '/synthesis',
                name: 'synthesis',
                meta: {
                    title: '合成管理'
                },
                children: [
                    {
                        path: '/synthesis/config',
                        name: 'synthesisConfig',
                        meta: {
                            title: '合成配置'
                        },
                        component: () => import('@/views/synthesis/config')
                    },
                    {
                        path: '/synthesis/recode',
                        name: 'synthesisRecode',
                        meta: {
                            title: '合成记录'
                        },
                        component: () => import('@/views/synthesis/recode')
                    },
                ]
            },
            {
                path: '/renew',
                name: 'renew',
                meta: {
                    title: '换新管理'
                },
                children: [
                    {
                        path: '/renew/config',
                        name: 'renewConfig',
                        meta: {
                            title: '换新配置'
                        },
                        component: () => import('@/views/renew/config')
                    },
                    {
                        path: '/renew/recode',
                        name: 'renewRecode',
                        meta: {
                            title: '换新记录'
                        },
                        component: () => import('@/views/renew/recode')
                    },
                ]
            },
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