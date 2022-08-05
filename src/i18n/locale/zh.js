export default {
    header: {
        logout: '退出登录',
        userinfo: '个人中心',
    },
    config: {
        theme: '深色模式',
        tabs: '标签栏',
        lang: '语言',
        menu: '导航栏布局'
    },
    login: {
        title: '管理员登录',
        message: {
            username: '用户名不能为空',
            password: '密码不能为空',
            invalid: '用户名或密码错误'
        },
        placeholder: {
            username: '用户名',
            password: '密码'
        }
    },
    menu: {
        name: '菜单名称',
        title: '菜单标题',
        icon: '图标',
        status: '状态',
        path: '路由',
        sort: '排序',
        type: '类型',
        type2menu: '菜单',
        type2action: '操作',
        deleteTips: '您确认要删除该菜单吗？',
        switchTips: '您确认要修改该菜单的状态吗？',
        perMenu: '上级菜单',
        addFormTitle: '菜单添加',
        editFormTitle: '菜单编辑',
        firstLevel: '一级菜单',
        addSubmenu: '添加子菜单',
        validate: {
            name: '菜单名称不能为空',
            title: '菜单标题不能为空',
            path: '菜单路由不能为空',
        }
    },
    role: {
        title: '权限组名称',
        description: '描述',
        addFormTitle: '权限组添加',
        editFormTitle: '权限组编辑',
        deleteTips: '您确认要删除该权限组吗',
        validate: {
            title: '权限组名称不能为空',
            description: '权限组描述不能为空',
        }
    },
    account: {
        name: '管理员用户名',
        title: '所属权限组',
        createdAt: '创建时间',
        lastLoginAt: '最后登录时间',
        password: '密码',
        rePassword: '确认密码',
        addFormTitle: '管理员添加',
        editFormTitle: '管理员编辑',
        deleteTips: '您确认要删除该管理员吗?',
        validate: {
            name: '用户名不能为空',
            password: '密码不能为空',
            rePassword: '确认密码不能为空',
            passwordNotMatch: '两次密码不一致',
            groupId: '请选择用户所属权限组'
        }
    },
    category: {
        name: '分类名称',
        createdAt: '添加时间',
        addSubCate: '添加子分类',
        addFormTitle: '分类添加',
        editFormTitle: '分类编辑',
        firstLevel: '一级分类',
        perCategory: '父级分类',
        deleteTips: '您确认要删除该分类吗?',
        validate: {
            name: '分类名称不能为空'
        }
    },
    works: {
        name: '作品',
        author: '作者',
        category: '所属分类',
        type: '类型',
        issued: '发行/库存',
        status: '在售状态',
        recommend: '推荐权值',
        createdAt: '创建时间',
        placeholder: ['作者昵称/ID/手机尾号', '名称'],
        selector: {
            title: '在售状态',
            options: ['在售状态', '销售中', '未上架', '已下架']
        },
        validate: {
            name: '分类名称不能为空'
        }
    },
    token: {
        chain: '链上标识',
        name: '名称',
        author: '用户',
        owner: '拥有者',
        transactionId: '铸造交易号',
        status: '状态',
        belongWork: '所属作品',
        createdAt: '发行时间',
        deleteTips: '您确认要删除该通证吗?',
        placeholder: ['作品名称/ID', '作者/ID/手机', '拥有者/ID/手机'],
        selector: {
            title: '在售状态',
            options: ['全部', '出售中', '已售']
        },
        editFormTitle: '通证编辑',
        file: '文件',
        validate: {
            name: '名称不能为空',
            workId: '所属作品不能为空',
            file: '通证图片不能为空'
        }
    },
    issued: {
        name: '名称',
        work: '发售作品',
        status: '状态',
        type: '类型',
        belongWork: '关联作品',
        issuedTime: '发售时间',
        priorityTime: '优先购时间',
        createdAt: '创建时间',
        switchTips: '您确认要修改该作品的状态吗?',
        deleteTips: '您确认要删除该作品吗?',
        addFormTitle: '发售日历添加',
        editFormTitle: '发售日历编辑',
        options: ['作品', '盲盒'],
        validate: {
            work: '关联的作品不能为空',
            type: '作品类型不能为空'
        }
    },
    user: {
        avatar: '头像',
        nickname: '用户昵称',
        phone: '手机',
        balance: '余额',
        tokenValue: '通证值',
        recommender: '推荐人ID',
        registerTime: '注册时间',
        loginTime: '最近登录时间',
        status: '状态',
        placeholder: ['用户ID / 昵称', '推荐人ID']
    },
    activity: {
        title: '标题',
        bgColor: '背景色',
        bgImage: '背景图',
        link: '链接',
        template: '模版',
        desc: '描述',
        sort: '排序',
        status: '状态',
        startTime: '活动开始时间',
        endTime: '活动结束时间',
        switchTips: '您确认要修改该活动的状态吗?',
        deleteTips: '您确认要删除该活动吗?',
        addFormTitle: '活动添加',
        editFormTitle: '活动编辑',
        position: '趣玩显示',
        statusText: ['禁用', '启用', '仅展示'],
        validate: {
            title: '活动标题不能为空',
            link: '活动链接不能为空',
            desc: '活动描述不能为空'
        }
    },
    components: {
        fileSelect: {
            title: '文件上传',
            choose: '从本地上传'
        }
    },
    button: {
        login: '登录',
        confirm: '确认',
        done: '完成',
        cancel: '取消',
        add: '添加',
        edit: '编辑',
        delete: '删除',
        clear: '清除',
        disabled: '禁用',
        enabled: '启用',
        next: '下一页',
        prev: '上一页',
        view: '查看',
        share: '分享',
        authorize: '授权',
        search: '搜索',
        detail: '详情',
        operate: '操作',
        export: '导出',
        destroy: '销毁',
        hide: '隐藏',
        show: '显示',
    },
    message: {
        operateFail: '操作失败',
        operateSuccess: '操作成功',
        noData: '暂无数据',
        getFail: '获取数据失败',
        searchbarPlaceholder: '输入搜索的关键字',
        copySuccess: '复制到剪切板',
        copyFail: '复制失败',
        uploadFail: '上传失败'
    }
}