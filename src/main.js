import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//拦截器
import http from './http'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.$axios = axios;


new Vue({
    router,
    store,
    http,
    render: h => h(App)
}).$mount('#app')