import { createApp } from 'vue'
import App from './App.vue'
import store from '/src/store/index.js'
import router from '/src/router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '/src/css/base.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })
app.mount('#app')
