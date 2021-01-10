<template>
    <div>
        <app-header></app-header>
        <app-main></app-main>
        <app-navbar></app-navbar>
    </div>

</template>
<script>
    import AppHeader from "./content/AppHeader";
    import AppMain from "./content/AppMain";
    import AppNavbar from "./content/AppNavbar";

    export default {
        name: "Layout",
        components: {
            AppHeader,
            AppMain,
            AppNavbar,
        }
    }
</script>

<style scoped>

    /*头部栏*/
    .header {
        position: absolute;
        top: 0px;
        right: 0px;
        height: 80px;
    }

    /*侧边栏*/
    .navbar {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        text-align: left;
        background-color:#2F4156;
        overflow-y: auto;
    }

    /*主体区域*/
    .main {
        position: absolute;
        top: 80px;
        right: 0px;
        bottom: 0px;
        padding: 10px;
        overflow-y: auto;
    }
</style>