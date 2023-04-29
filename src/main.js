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
import ArrowDown from 'vue-material-design-icons/ChevronDoubleDown.vue'
import Alert from 'vue-material-design-icons/Alert.vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import West from 'vue-material-design-icons/KeyboardReturn.vue'
import Edit from 'vue-material-design-icons/NoteEdit.vue'
import CloseBox from 'vue-material-design-icons/CloseBox.vue'
import Upload from 'vue-material-design-icons/Upload.vue'
import Save from 'vue-material-design-icons/ContentSaveAll.vue'
import Island from 'vue-material-design-icons/Home.vue'


createApp(App)
.use(store)
.use(vueCookies)
.use(router)
.component('logout', Logout)
.component('island', Island)
.component('delete', Delete)
.component('close', Close)
.component('person', Person)
.component('history', History)
.component('music', Music)
.component('graphic', Graphic)
.component('ArrowDown', ArrowDown)
.component('star', Star)
.component('play', Play)
.component('alert', Alert)
.component('west', West)
.component('edit', Edit)
.component('closebox', CloseBox)
.component('upload', Upload)
.component('save', Save)
.mount('#app')
