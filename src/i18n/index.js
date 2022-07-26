import { createI18n } from 'vue-i18n'
import zh from './locale/zh'
import en from './locale/en'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import enUS from 'element-plus/lib/locale/lang/en'

const i18n = createI18n({
    // 默认语言
    locale: localStorage.getItem('lang') || 'zh-CN',
    silentFallbackWarn: true,
    globalInjection: true,
    fallbackLocale: 'zh-CN',
    messages: {
        'en-US': {
            el: enUS,
            ...en
        },
        'zh-CN': {
            el: zhCN,
            ...zh
        }
    }
})



export default i18n