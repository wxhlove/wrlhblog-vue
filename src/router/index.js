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
export default router
