import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vi from 'element-plus/dist/locale/vi'

import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus, {
    locale: vi
})

app.mount('#app')
