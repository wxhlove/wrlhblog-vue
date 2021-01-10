import Vue from 'vue'
import Vuex from 'vuex'
import menuStore from "./modules/menuStore";

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        menuStore   //菜单相关
    }

})
