import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBus from 'vue-bus';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import moment from "moment";

import {postKeyValueRequest} from './utils/api'
import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {getRequest} from './utils/api'
import {initMenu} from "./utils/routesMenu";
import {postImageUpload} from "./utils/api";

Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.postImageUpload = postImageUpload

Vue.use(VueBus);

Vue.use(ElementUI);

Vue.config.productionTip = false


//配置导航守卫
router.beforeEach((to, from, next) => {


    if (to.path === '/login') {
        console.log("path ==> " + to.path)
        next()
    } else {
        if (sessionStorage.getItem("blogUser")) {
            store.state.menuStore.routes.length > 0 ? '' : initMenu(router, store);
            next();
        } else {
            next("/login?redirect=" + to.path)
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
