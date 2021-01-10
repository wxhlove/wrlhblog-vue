<template>
    <div class="main" :style="{left:collapse.width+'px'}">
        <div>
            <app-home v-if="this.$router.currentRoute.path ==='/'"></app-home>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import AppHome from "./AppHome";

    export default {
        components: {AppHome},
        data() {
            return {}
        },
        comments:{
            AppHome
        },
        computed: {
            //获取控制侧边菜单栏隐藏展开的参数
            collapse() {
                return this.$store.state.menuStore.collapse;
            }
        }
    }
</script>
<style>

</style>