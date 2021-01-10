import Login from "../views/Login";
import Layout from "../components/layout/Layout";

/**
 * 静态路由
 * @type {({path: string, component: {data(): {loginForm: {password: string, username: string}, loginPasswordKnow: string, rules: {password: [{trigger: string, message: string, required: boolean}], username: [{trigger: string, message: string, required: boolean}]}}, methods: {login(): void}, name: string}, name: string}|{path: string, component: {components: {AppNavbar: {data(): {navbarWidth: number, uniqueOpened: boolean, isCollapse: boolean}, computed: {routes(): default.computed.$store.state.routes}, methods: {handleOpen(*, *), changeNavbarWidth(*, *): void, handleClose(*, *)}, mounted(): void}, AppMain: {data(): {mainLeft: number}, methods: {}, mounted(): void}, AppHeader: {data(): {headerRight: string, header: string, headerRightChange: number, user: {}}, methods: {handleCommand(*): void, logout(): void, headerToRight(): void}, mounted(): void}}, name: string}, meta: {requireAuth: boolean}, name: string})[]}
 */
export const staticStateRouter = [

    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        meta: {
            requireAuth: true
        }
    }
]