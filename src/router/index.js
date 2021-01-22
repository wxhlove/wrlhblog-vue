import Vue from 'vue'
import VueRouter from 'vue-router'
import {staticStateRouter} from "./staticStateRouter";

Vue.use(VueRouter)

// const routes = staticStateRouter;
const routes = staticStateRouter
const router = new VueRouter({
    // mode: "history",
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router
