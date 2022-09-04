import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import './index.css'
import vueCookies from 'vue-cookies'

import Logout from 'vue-material-design-icons/Logout.vue';
import Close from 'vue-material-design-icons/Close.vue';


createApp(App)
.use(store)
.use(vueCookies)
.use(router)
.component('logout', Logout)
.component('close', Close)
.mount('#app')
