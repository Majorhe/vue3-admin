import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'
import i18n from './i18n'
import * as echarts from 'echarts';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as CustomIconsVue from '@/assets/icons'
import emitter from '@/utils/eventBus'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$bus = emitter

// register element icons
for (const [key, icon] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, icon)
}

// register custom icons
for (const [key, icon] of Object.entries(CustomIconsVue)) {
    app.component(key, icon)
}

app.use(ElementPlus)
    .use(router)
    .use(store)
    .use(i18n)
    .mount('#app')
