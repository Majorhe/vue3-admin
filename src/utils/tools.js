import useClipboard from 'vue-clipboard3'

export default {
    formatMenuList(menus, pid) {
        let treeData = []
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].parentid === pid) {
                menus[i].children = this.formatMenuList(menus, menus[i].id)
                menus[i].leaf = menus[i].children.length === 0
                treeData.push(menus[i])
            }
        }
        return treeData
    },
    // 用户头像处理
    avatar(url) {
        url = url || '/static/img/head.b26a719d.png'
        return this.cdn(url)
    },
    // 不全静态文件地址
    cdn(url, size = null) {
        if (!url) return ''
        if (!url.includes('.gif') && size) url = url + '!' + size
        return process.env.VUE_APP_CDN_API + url
    },
    async copy(str) {
        const { toClipboard } = useClipboard()
        await toClipboard(str)
    }
}