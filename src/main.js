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
import Heart from 'vue-material-design-icons/Heart.vue'
import HeartPlus from 'vue-material-design-icons/HeartPlus.vue'
import HeartMinus from 'vue-material-design-icons/HeartMinus.vue'
import ThumbUp from 'vue-material-design-icons/ThumbUp.vue'
import ThumbDown from 'vue-material-design-icons/ThumbDown.vue'
import TrashCan from 'vue-material-design-icons/TrashCan.vue'
import HomeCircle from 'vue-material-design-icons/HomeCircle.vue'


createApp(App)
.use(store)
.use(vueCookies)
.use(router)
.component('logout', Logout)
.component('thumb-up', ThumbUp)
.component('thumb-down', ThumbDown)
.component('trash-can', TrashCan)
.component('island', Island)
.component('home-circle', HomeCircle)
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
.component('heart', Heart)
.component('heart-plus', HeartPlus)
.component('heart-minus', HeartMinus)
.mount('#app')
