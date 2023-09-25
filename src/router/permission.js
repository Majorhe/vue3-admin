import Layout from "@/layout";

const permission = [
    {
        path: '/',
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
]

export default permission