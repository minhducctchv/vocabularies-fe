import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vi from 'element-plus/dist/locale/vi'
import './assets/main.css'
import {windowResizeListener} from "@/js/WindowWidthHeight";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus, {
    locale: vi
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

windowResizeListener()
