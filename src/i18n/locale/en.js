export default {
    header: {
        logout: 'sign out',
        userinfo: 'personal',
    },
    config: {
        theme: 'dark mode',
        tabs: 'show tabs',
        lang: 'language',
        menu: 'navbar layout',
    },
    login: {
        title: 'Administrator Sign In',
        message: {
            username: 'Please input user name',
            password: 'Please input your password',
            invalid: 'Invalid username or password'
        },
        placeholder: {
            username: 'username',
            password: 'password'
        }
    },
    menu: {
        name: 'Name',
        title: 'Title',
        icon: 'Icon',
        status: 'Status',
        path: 'Route',
        sort: 'Sort',
        type: 'Type',
        type2menu: 'Menu',
        type2action: 'Action',
        deleteTips: 'Are you sure you want to delete this menu?',
        switchTips: 'Are you sure you want to switch this menu status?',
        perMenu: 'Parent Menu',
        addFormTitle: 'Add Menu',
        editFormTitle: 'Edit Menu',
        firstLevel: 'First Level Menu',
        addSubmenu: 'Add submenu',
        validate: {
            name: 'Menu name cannot be empty',
            title: 'Menu title cannot be empty',
            path: 'Menu path cannot be empty',
        }
    },
    role: {
        title: 'Role name',
        description: 'Description',
        addFormTitle: 'Add role',
        editFormTitle: 'Edit role',
        deleteTips: 'Are you sure you want to delete this role?',
        validate: {
            title: 'Role name cannot be empty',
            description: 'Role description cannot be empty',
        }
    },
    account: {
        name: 'administrator name',
        title: 'Role name',
        createdAt: 'Created time',
        lastLoginAt: 'Last login time',
        password: 'Password',
        rePassword: 'Confirm password',
        addFormTitle: 'Add administrator',
        editFormTitle: 'Edit administrator',
        deleteTips: 'Are you sure you want to delete this administrator?',
        validate: {
            name: 'Administrator name cannot be empty',
            password: 'Password cannot be empty',
            rePassword: 'Please input the password again',
            passwordNotMatch: 'The two passwords do not match',
            groupId: 'Please choose a role group'
        }
    },
    category: {
        name: 'Category name',
        createdAt: 'Created time',
        addSubCate: 'Add sub category',
        addFormTitle: 'Add Category',
        editFormTitle: 'Edit Category',
        firstLevel: 'First Level Category',
        perCategory: 'Parent Category',
        deleteTips: 'Are you sure you want to delete this category?',
        validate: {
            name: 'Category name cannot be empty'
        }
    },
    works: {
        name: 'Name',
        author: 'Author',
        category: 'Category',
        type: 'Type',
        issued: 'Issued/Stock',
        status: 'Status',
        recommend: 'Recommend level',
        createdAt: 'Created Time',
        deleteTips: 'Are you sure you want to delete this token?',
        placeholder: ['Author/ID/Phone', 'Name'],
        selector: {
            title: 'Status select',
            options: ['status', 'on sale', 'not on shelves', 'off shelves']
        },
        validate: {
            name: 'Category name cannot be empty'
        }
    },
    token: {
        chain: 'Token ID',
        name: 'Name',
        author: 'Author',
        owner: 'Owner',
        transactionId: ' ',
        status: 'Status',
        belongWork: 'Belong Work',
        createdAt: 'Issued Time',
        placeholder: ['Token Name/ID', 'Author/ID/Phone', 'Owner/ID/Phone'],
        selector: {
            title: 'Status',
            options: ['status', 'on sale', 'sold']
        },
        editFormTitle: 'Token Edit',
        file: 'Token image',
        validate: {
            name: 'Token name cannot be empty',
            workId: 'Belong work cannot be empty',
            file: 'Token file cannot be empty'
        }
    },
    issued: {
        name: 'Name',
        work: 'Work Name',
        status: 'Status',
        type: 'Type',
        belongWork: 'Belong Work',
        issuedTime: 'Issued Time',
        priorityTime: 'Priority Buy Time',
        createdAt: 'Created Time',
        switchTips: 'Are you sure you want to switch this work status?',
        deleteTips: 'Are you sure you want to delete this work?',
        addFormTitle: 'Issued Add',
        editFormTitle: 'Issued Edit',
        options: ['work', 'mbox'],
        validate: {
            work: 'Belong work cannot be empty',
            type: 'Work Type cannot be empty'
        }
    },
    user: {
        avatar: 'Avatar',
        nickname: 'Nickname',
        phone: 'Mobile',
        balance: 'Balance',
        tokenValue: 'Token Value',
        recommender: 'Recommender',
        registerTime: 'Registration Time',
        loginTime: 'Last Login Time',
        status: 'Status',
        placeholder: ['UID / Nickname', 'Recommender ID']
    },
    activity: {
        title: 'Title',
        bgColor: 'bgColor',
        bgImage: 'bgImage',
        link: 'Route',
        template: 'Template',
        desc: 'Description',
        sort: 'Sort',
        status: 'Status',
        startTime: 'Start Time',
        endTime: 'End Time',
        switchTips: 'Are you sure you want to switch this activity status?',
        deleteTips: 'Are you sure you want to delete this activity?',
        addFormTitle: 'Activity Add',
        editFormTitle: 'Activity Edit',
        position: 'Visible',
        statusText: ['disabled', 'opened', 'only show'],
        validate: {
            title: 'Belong work cannot be empty',
            link: 'Work Type cannot be empty',
            desc: 'Activity description cannot be empty',
        }
    },
    components: {
        fileSelect: {
            title: 'Upload File',
            choose: 'Select File'
        }
    },
    button: {
        login: 'Sign In',
        confirm: 'Confirm',
        done: 'Done',
        cancel: 'Cancel',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        clear: 'Clear',
        disabled: 'Disabled',
        enable: 'Enabled',
        next: 'Next',
        prev: 'Prev',
        view: 'View',
        share: 'Share',
        authorize: 'Authorize',
        search: 'Search',
        detail: 'Detail',
        operate: 'Operate',
        export: 'Export',
        destroy: 'Destroy',
        hide: 'Hide',
        show: 'Show',
    },
    message: {
        operateFail: 'Operation Failed',
        operateSuccess: 'Operation Successful',
        noData: 'No Data',
        getFail: 'Failed to get data',
        searchbarPlaceholder: 'Input search keywords',
        copySuccess: 'Copied to clipboard',
        copyFail: 'Copy Failed',
        uploadFail: 'Upload Failed'
    }
}