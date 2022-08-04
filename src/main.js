import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import './index.css'
import vueCookies from 'vue-cookies'


createApp(App)
.use(store)
.use(vueCookies)
.use(router)
.mount('#app')
