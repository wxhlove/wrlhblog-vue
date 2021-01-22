<template>
    <el-menu
            router
            class="navbar"
            :unique-opened='true'
            :default-active="this.$route.path"
            :collapse="collapse.isCollapse"
            :style="{width:collapse.width+'px'}"
            @open="handleOpen"
            @close="handleClose"
            :collapse-transition='false'
            background-color="#2F4156"
            text-color="#909399"
            active-text-color="#409EFF">

        <el-menu-item index="/" background-color="#2F4156">
            <i class="fa fa-home fa-fw" style="margin-right: 10px"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu :index="index + ''" v-for="(item , index) in routes" :key="index">
            <template slot="title" style="background-color: #1F2D3D">
                <i :class="item.iconCls" style="color:#909399 ;margin-right: 10px"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="(itemj , indexj) in item.children" @key="indexj" :index="itemj.path" class="menuItem">
                <i :class="itemj.iconCls" style="margin-right: 5px"></i>
                {{itemj.name}}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>

    export default {

        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            }
        },
        computed: {
            //获取路由导航信息
            routes() {
                return this.$store.state.menuStore.routes;
            },
            //获取控制侧边菜单栏隐藏展开的参数
            collapse() {
                return this.$store.state.menuStore.collapse;
            }
        },
    }
</script>
<style>
    /* 修改子菜单颜色 */
    .menuItem {
        background-color: #1F2D3D !important;
    }

    /*修改子菜单悬浮时的菜单样式*/
    .menuItem:hover {
        outline: 0 !important;
        background-color: #141D28 !important;
    }

    /*!*选中状态时文字的颜色*!*/
    /*.is-active {*/
    /*    color: #409EFF;*/
    /*}*/

</style>