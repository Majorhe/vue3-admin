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
                    id: '1', name: 'home', title: '首页', icon: 'Home', leaf: false,
                    children: [
                        {id: '1-1', name: 'dashboard', title: '数据看板', icon: 'LineChart', leaf: true},
                        {id: '1-2',name: 'workbench', title: '工作台', icon: 'Workbench', leaf: true},
                        {id: '1-3',name: 'usercenter', title: '个人中心', icon: 'UserFilled', leaf: true},
                    ]
                },
                {
                    id: '2', name: 'permission', title: '权限管理', icon: 'Permissions', leaf: false,
                    children: [
                        {id: '2-1', name: 'menu', title: '菜单列表', icon: 'Menu', leaf: true},
                        {id: '2-2', name: 'role', title: '管理员组', icon: 'UserGroup', leaf: true},
                        {id: '2-3', name: 'account', title: '管理员列表', icon: 'UserFilled', leaf: true},
                    ]
                },
                {
                    id: '3', name: 'user', title: '用户管理', icon: 'UserGroup', leaf: false,
                    children: [
                        {id: '3-1', name: 'userList', title: '用户列表', icon: 'UserFilled', leaf: true},
                        {id: '3-2', name: 'userAuth', title: '实名认证', icon: 'Stamp', leaf: true},
                    ]
                },
                {
                    id: '4', name: 'work', title: '作品管理', icon: 'Notebook', leaf: false,
                    children: [
                        {id: '4-1', name: 'workList', title: '作品列表', icon: 'List', leaf: true},
                    ]
                }
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