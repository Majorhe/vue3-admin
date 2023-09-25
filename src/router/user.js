import Layout from "@/layout";

const user = [
    {
        path: '/',
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
]

export default user
