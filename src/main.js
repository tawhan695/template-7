import { createApp } from 'vue'
import { pinia } from "./stores";
import { createHead } from '@vueuse/head';

import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'animate.css';


import App from './App.vue'
import router from './router'
import mixins from "./mixins";
//import i18n from "./i18n"


import "bootstrap"
import './assets/scss/style.scss'
import './assets/scss/swall.scss'

import moment from 'moment/moment';
import 'moment/locale/th';

import VueGtag from "vue-gtag";

// import VueTypedJs from 'vue-typed-js'
import VueLazyLoad from 'vue3-lazyload'


const app = createApp(App)
const head = createHead()

// app.use(VueTypedJs)
app.use(pinia)
app.use(router)
app.use(head)
app.use(LoadingPlugin)
app.use(VueLazyLoad)
app.use(VueGtag, {
    appName:"TAWIN65",
    pageTrackerScreenviewEnabled: true,
    config: { id: import.meta.env.VITE_MEASUREMENT_ID ,debug_mode:true },
    debug_mode:true
}, router)
//app.use(i18n)
app.mixin(mixins)

app.mount('#app')
app.config.globalProperties.$filters = {
    currencyUSD(value) {
        return '$' + value
    },
    bank(number) {
        return ("" + number).replace(/[^0-9]/g, '')
            .replace(/(\d{3})(\d{1})(\d{5})(\d{1})/, '$1-$2-$3-$4')
    },
    phone(phone) {
        return ("" + phone).replace(/[^0-9]/g, '')
            .replace(/(\d{3})/, '$1-')
    },
    moment(date) {
        return moment(date).locale("th").format("ll LT")
    },

}
