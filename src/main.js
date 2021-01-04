import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {postKeyValueRequest} from './utils/api'
import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {getRequest} from './utils/api'

Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest

Vue.use(ElementUI);

Vue.config.productionTip = false


//配置导航守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (window.sessionStorage.getItem("blogUser")) {
            next();
        } else {
            next("/login")
            // next({path: '/', query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            // })
        }
    } else {
        next();
    }
});


// if (to.path == '/') {
//     // if(to.requireAuth){
//     //     if (window.sessionStorage.getItem("blogUser")) {
//     //         next();
//     //     } else {
//     //         next("/login")
//     //     }
//     // }
//     console.log("requireAuth => " + to.requireAuth)
//     next();
// } else {
//     if (window.sessionStorage.getItem("blogUser")) {
//         next();
//     } else {
//         next("/?redirect=" + to.path)
//     }
// }
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
