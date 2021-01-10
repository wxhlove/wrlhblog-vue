import {getRequest} from "./api";


//初始化router
export const initMenu = (router, store) => {
    //从后端获取菜单信息
    getRequest("/menu/").then(resp => {
        if (resp) {
            //格式化菜单信息
            let routesFormart = menuFormart(resp);
            router.addRoutes(routesFormart)
            //提交格式化后的菜单routes
            store.commit("INIT_ROUTES", routesFormart)
        }
    })
}

//格式化菜单信息
const menuFormart = menus => {
    let routeFormat = []
    menus.forEach(router => {
            let pathBoolean = router.componentDir + router.componentDir != null && router.componentDir !== '';
            let menuRouterFormat = {
                path: router.path,
                name: router.name,
                meta: router.meta,
                iconCls: router.iconCls,
                component(resolve) {
                    if (pathBoolean) {
                        require(["../views/"+router.componentDir+"/"+router.component+".vue"], resolve)
                    } else {
                        require(["../components/layout/" + router.component + ".vue"], resolve)
                    }
                },
                children: router.children
            }
            //递归获取子内容
            if (menuRouterFormat.children && menuRouterFormat.children instanceof Array) {
                menuRouterFormat.children = menuFormart(menuRouterFormat.children)
            }
            routeFormat.push(menuRouterFormat)
        }
    )
    return routeFormat;
}