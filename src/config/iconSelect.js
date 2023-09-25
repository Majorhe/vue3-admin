//图标选择器配置
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as CustomIconsVue from '@/assets/icons'
const elIcons = []
const cusIcons = []
for (const [key, ] of Object.entries(ElementPlusIconsVue)) {
    elIcons.push(key)
}
for (const [key, ] of Object.entries(CustomIconsVue)) {
    cusIcons.push(key)
}
export default {
    icons: [
        { name: '扩展', icons: cusIcons},
        { name: '默认', icons: elIcons}
    ]
}
