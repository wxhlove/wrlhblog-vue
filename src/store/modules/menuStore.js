const menuStore = {
    // namespaced: true,

    state: {
        routes: [], //菜单路由数组
        collapse: sessionStorage.getItem("menuCollapse") ? JSON.parse(sessionStorage.getItem("menuCollapse")) : {
            isCollapse: false,
            headerRight: 'fa fa-outdent',
            // headerRight: 'el-icon-s-fold',
            width: 200
        }
    },
    mutations: {
        //初始化菜单路由数组
        INIT_ROUTES(state, data) {
            state.routes = data
        },
        //控制菜单栏折叠
        MENU_COLLAPSE(state, boolean) {
            state.collapse.isCollapse = boolean;
            state.collapse.width = boolean ? 60 : 200
            state.collapse.headerRight = boolean ? 'fa fa-indent' : 'fa fa-outdent'
            sessionStorage.setItem("menuCollapse", JSON.stringify(state.collapse))
        }
    },
    actions: {},
    modules: {},
    getters: {}

}
export default menuStore;