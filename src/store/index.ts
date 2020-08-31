import Vue from "vue";
import Vuex from 'vuex'
import FooterBar from '@/components/footerBar/vuex';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        FooterBar
    }
})
