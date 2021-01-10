<template>
    <div class="header" :style="{ left:collapse.width+'px'}">
        <div class="header-up">
            <div>
                <i :class="collapse.headerRight" style="font-size: 25px;" @click="headerToRight"></i>
            </div>
            <div>
                <el-dropdown trigger="click" @command="handleCommand">
                      <span style="cursor: pointer;color: #409EFF">
                          <el-avatar shape="square" :size="35" fit="scale-down" :src="user.userFace"/>
                           <i class="el-icon-caret-bottom" style="font-size: 12px;margin-left: 5px"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class='header-dow'>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {}
            }
        },
        mounted() {
            this.user = JSON.parse(window.sessionStorage.getItem("blogUser"))
        },
        methods: {
            //头部控制侧边栏大小转换按钮
            headerToRight() {
                if (this.collapse.isCollapse) {
                    this.$store.commit("MENU_COLLAPSE", false)
                } else {
                    this.$store.commit("MENU_COLLAPSE", true)
                }
            },

            //个人中心点击事件
            handleCommand(command) {
                if (command === 'logout') {
                    this.logout();
                } else if (command === 'personalCenter') {
                    alert("个人中心")
                }
            },
            //退出登录
            logout() {
                this.getRequest("/logout").then(resp => {
                    if (resp) {
                        //退出成功时删除本地存储的sessionStorage
                        window.sessionStorage.clear();
                        //跳转到登录页
                        this.$router.replace("/login")
                    }
                })
            }
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

    .header-up {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
    }

    .header-dow {
        display: flex;
        justify-items: left;
        height: 25px;
        border-top: #EBEEF5 solid 1px;
        border-bottom: #EBEEF5 solid 2px;
    }

</style>