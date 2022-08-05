
export default {
    watch: {
        $route(e) {
            this.handleRouteChange(e)
        }
    },
    mounted() {
        this.activeMenu = this.$route.name
    },
    data() {
        return {
            activeMenu: '',
            isCollapse: false,
            menuList: [
                {
                    id: '1',
                    name: 'home',
                    title: '首页',
                    icon: 'Home',
                    leaf: false,
                    children: [
                        {id: '11', name: 'dashboard', title: '数据看板', icon: 'LineChart', leaf: true},
                        {id: '12',name: 'workbench', title: '工作台', icon: 'Workbench', leaf: true},
                        {id: '13',name: 'usercenter', title: '个人中心', icon: 'UserFilled', leaf: true},
                    ]
                },
                {
                    id: '2',
                    name: 'permission',
                    title: '权限管理',
                    icon: 'Permissions',
                    leaf: false,
                    children: [
                        {id: '21', name: 'menu', title: '菜单', icon: 'Menu', leaf: true},
                        {id: '22', name: 'role', title: '权限组', icon: 'UserFilled', leaf: true},
                        {id: '23', name: 'account', title: '管理员', icon: 'UserGroup', leaf: true},
                    ]
                },
                {
                    id: '3',
                    name: 'works',
                    title: '作品管理',
                    icon: 'PictureFilled',
                    leaf: false,
                    children: [
                        {id: '31', name: 'worksList', title: '作品列表', icon: 'ListFilled', leaf: true},
                        {id: '32', name: 'token', title: '通证列表', icon: 'Coin', leaf: true},
                        {id: '33', name: 'category', title: '分类管理', icon: 'Category', leaf: true},
                        {id: '34', name: 'issued', title: '发售日历', icon: 'Calendar', leaf: true},
                    ]
                },
                {
                    id: '4',
                    name: 'user',
                    title: '用户管理',
                    icon: 'UserGroup',
                    leaf: false,
                    children: [
                        {id: '31', name: 'userList', title: '用户列表', icon: 'UserFilled', leaf: true},
                    ]
                },
                {
                    id: '4',
                    name: 'activity',
                    title: '活动管理',
                    icon: 'Present',
                    leaf: false,
                    children: [
                        {id: '41', name: 'activityList', title: '活动列表', icon: 'ListFilled', leaf: true},
                        {id: '42', name: 'synthesis', title: '合成管理', icon: 'SetUp', leaf: false,
                            children: [
                                {id: '421', name: 'synthesisConfig', title: '合成配置', icon: 'Setting', leaf: true},
                                {id: '422', name: 'synthesisRecode', title: '合成记录', icon: 'List', leaf: true},
                            ]
                        },
                        {id: '43', name: 'renew', title: '换新管理', icon: 'Guide', leaf: false,
                            children: [
                                {id: '431', name: 'renewConfig', title: '换新配置', icon: 'Setting', leaf: true},
                                {id: '432', name: 'renewRecode', title: '换新记录', icon: 'List', leaf: true},
                            ]
                        },
                    ]
                },
            ]

        }
    },
    methods: {
        handleMenuSelect(name) {
            this.activeMenu = name
            this.$router.push({name: name})
        }
    }
}