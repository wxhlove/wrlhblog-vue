<template>
    <div>
        <div class="loginForm">
            <div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <h3 class="loginTitle">系统登录</h3>
                    <el-form-item size="small" prop="username">
                        <el-input prefix-icon="el-icon-user" size="small" placeholder="请输入用户名"
                                  v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item size="small" prop="password">
                        <el-input prefix-icon="el-icon-key" size="small" placeholder="请输入密码"
                                  v-model="loginForm.password"
                                  type="password" @keydown.enter.native="login"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="display: flex;justify-content: center; height: 20px">
                <router-link style="color: #E4E7ED ; margin-right: 25px" to="">忘记密码</router-link>
                <router-link style="color: #E4E7ED ; margin-left: 25px" to="">注册账号</router-link>
            </div>
            <div style="margin-top: 20px">
                <el-button size="small" type="primary" style="width: 250px" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginPasswordKnow: 'false', //记住密码
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            //登录
            login() {
                //首先判断校验是否通过
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.postKeyValueRequest('/dologin', this.loginForm).then(resp => {
                            if (resp) {
                                //登录成功存储用户信息
                                window.sessionStorage.setItem("blogUser", JSON.stringify(resp.data))
                                this.$router.replace("/")
                                // this.$router.replace((path == '/' || path == undefined) ? "/home" : path)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style>
    .loginForm {
        width: 300px;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        background-clip: padding-box;
        background: #fff;
        margin: 230px auto;
        padding: 15px 30px 20px 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        text-align: center;

        /*box-shadow: 0 0 25px #cac6c6; !*添加阴影 ，X轴偏移 y轴偏移 ， 模糊半径 ，阴影颜色*!*/
    }

</style>