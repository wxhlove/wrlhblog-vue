<template>
    <el-dialog
            :title="editTitle"
            :destroy-on-close="true"
            :visible.sync="dialog"
            width="30%">
        <el-form :model="lable"
                 :rules="rules"
                 :hide-required-asterisk='true'
                 ref="lableForm"
                 size="small"
                 label-width="85px"
                 style="width:70%;">
            <el-form-item label="标签名称:" prop="name">
                <el-input v-model="lable.name" placeholder="请输入标签名称..." :disabled="editTitle !== '添加标签'"
                          style="width: 100%;"  :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="样式预览:">
                <div style="display: flex ; justify-content: flex-start ; width: 100%;">
                    <div class="lableStyleBorder">
                        <span style="color: #C0C4CC ;font-size: 12px" v-if="!lable.name">标签样式预览</span>
                        <el-tag size="mini" effect="plain" :style="lable.nameColor" v-if="lable.name">{{lable.name}}
                        </el-tag>
                    </div>
                    <el-color-picker style="margin-left: 5px" size="mini" v-model="nameStyleColor"></el-color-picker>
                    <span style="font-size: 10px ; color: #909399 ;margin-left: 5px">选择标签颜色</span>
                </div>
            </el-form-item>
            <el-form-item label="描述:" prop="descripation">
                <el-input v-model="lable.descripation"
                          type="textarea"
                          rows="3"
                          placeholder="请输入标签描述..."
                          style="width: 100%;"
                          maxlength="30"
                          show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialog = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="editLable">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    //标签编辑
    export default {
        name: "lableEdit",
        props: {
            lableEditParam: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            var chackLableName = (rule, value, callback) => {
                this.chackLableNameAjax(rule, value, callback);
            };
            return {
                dialog: false,   //开启或关闭编辑页面
                editTitle: '',   //编辑页title
                nameStyleColor: '#909399',   //样式颜色
                lable: {
                    id: '',
                    name: '',
                    nameStyleColor: '#909399',
                    nameColor: {
                        borderColor: '#909399',
                        color: '#909399'
                    },
                    descripation: ''  //描述
                },

                rules: {
                    name: [
                        {required: true, message: '请输入标签名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur'},
                        {validator: chackLableName, trigger: "blur"}

                    ],
                    descripation: [
                        {required: true, message: '请输入标签描述说明', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            //获取父组件数据并更改当前组件数据
            lableEditParam: {
                deep: true, //深度监听
                handler(val) {
                    //打开编辑窗口
                    this.dialog = val.dialogFormVisible
                    //设置编辑窗口title
                    this.editTitle = val.editTitle
                    if (val.lable.id && this.dialog) {
                        this.lable = JSON.parse(JSON.stringify(val.lable))
                        this.nameStyleColor = this.lable.nameStyleColor
                    }
                }
            },
            //关闭窗口时将数据专递给父组件
            dialog(val) {
                if (!val) {
                    this.$emit("change—dialog", val);
                    this.nameStyleColor = '#909399';
                    this.lable = {
                        name: '',
                        nameStyleColor: '#909399',
                        nameColor: {
                            borderColor: '#909399',
                            color: '#909399'
                        },
                        descripation: ''  //描述
                    }
                }
            },
            //监听标签样式的颜色改变时
            nameStyleColor: function (val) {
                this.lable.nameStyleColor = val
                this.lable.nameColor.borderColor = val;
                this.lable.nameColor.color = val
            }
        },
        methods: {
            //编辑标签内容
            editLable() {
                if (this.editTitle === '添加标签') {
                    this.addLable()
                } else {
                    this.updateLable()
                }

            },
            //异步检查添加的是否重名
            chackLableNameAjax(rule, value, callback) {
                if (this.editTitle === '添加标签' && value !== '') {
                    this.getRequest(`/lable/check/${value}`).then(resp => {
                        if (resp) {
                            //存在相同的分类名称
                            callback(new Error("输入的标签名称已存在"));
                        } else {
                            callback();
                        }
                    }).catch(error => {
                        this.$message.error(error.response.message)
                    })
                } else {
                    //false 表示这一步可以不做校验
                    callback();
                }
            },

            //添加标签
            addLable() {

                this.$refs["lableForm"].validate(valia => {
                    if (valia) {
                        this.postRequest("/lable/", this.lable).then(resp => {
                            if (resp) {
                                this.dialog = false
                                //刷新lables 列表
                                this.$emit("update-initLables")
                                this.$message.success(resp.message)
                            }
                        }).catch(error => {
                            console.log("error ==> " + JSON.stringify(error))
                        })

                    }
                })
            },
            //更新标签
            updateLable() {
                this.putRequest("/lable/", this.lable).then(resp => {
                    if (resp) {
                        this.dialog = false
                        //刷新lables 列表
                        this.$emit("update-initLables")
                        this.$message.success(resp.message)
                    }
                }).catch(error => {
                    this.$message.error(error.response.message)
                })
            }
        }
    }
</script>

<style>
    .lableStyleBorder {
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        height: 32px;
        width: 180px;
        padding: 0 14px;
        box-sizing: border-box
    }

</style>