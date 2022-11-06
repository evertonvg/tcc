import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import './index.css'
import vueCookies from 'vue-cookies'

import Logout from 'vue-material-design-icons/Logout.vue';
import Close from 'vue-material-design-icons/Close.vue';
import Person from 'vue-material-design-icons/AccountBox.vue';
import History from 'vue-material-design-icons/ClipboardTextClockOutline.vue';
import Graphic from 'vue-material-design-icons/Camera.vue';
import Music from 'vue-material-design-icons/MusicNote.vue';
import Star from 'vue-material-design-icons/StarHalfFull.vue';
import Play from 'vue-material-design-icons/PlaySpeed.vue'


createApp(App)
.use(store)
.use(vueCookies)
.use(router)
.component('logout', Logout)
.component('close', Close)
.component('person', Person)
.component('history', History)
.component('music', Music)
.component('graphic', Graphic)
.component('star', Star)
.component('play', Play)
.mount('#app')
