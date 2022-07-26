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
                        {id: '22', name: 'role', title: '角色', icon: 'UserFilled', leaf: true},
                        {id: '23', name: 'account', title: '管理员', icon: 'UserGroup', leaf: true},
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