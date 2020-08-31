import Vue from 'vue'
import router from '@/router/index.ts'
import store from './store'
import 'vant/lib/index.css'
import '@/assets/font/iconfont.css'
import registerVantUI from '@/registerVantUI';
import App from "@/App.vue";
/*import Vconsole from 'vconsole'
new Vconsole()*/
Vue.config.productionTip = false
registerVantUI()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
