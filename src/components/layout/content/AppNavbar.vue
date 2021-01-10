<template>
    <el-menu
            router
            :default-active="this.$route.path"
            :unique-opened="uniqueOpened"
            :collapse="collapse.isCollapse"
            :style="{width:collapse.width+'px'}"
            @open="handleOpen"
            @close="handleClose"
            class="navbar"
            background-color="#2F4156"
            text-color="#ffff"
            active-text-color="#ffd04b">

        <el-menu-item index="/">
            <i class="el-icon-connection" style="color:#ffff"/>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu :index="index + ''" v-for="(item , index) in routes" :key="index">
            <template slot="title">
                <i :class="item.iconCls" style="color:#ffff"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="(itemj , indexj) in item.children" @key="indexj" :index="itemj.path">
                    {{itemj.name}}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>

    export default {

        data() {
            return {
                uniqueOpened: true, //是否只展开一个菜单栏
            }
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

</style>