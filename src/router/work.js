import Layout from "@/layout";

const work = [
    {
        path: '/',
        name: 'work',
        meta: {
            title: '作品管理'
        },
        component: Layout,
        children: [
            {
                path: '/work',
                name: 'workList',
                meta: {
                    title: '作品列表'
                },
                component: () => import('@/views/works')
            },
        ]
    },
]

export default work