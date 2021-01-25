<template>
    <el-dialog
            :title="editTitle"
            :visible.sync="dialog"
            width="30%"
            :destroy-on-close="true">
        <!--  表单内容-->
        <el-form
                :model="sort"
                :rules="rules"
                ref="sortForm"
                size="small"
                label-width="85px"
                style="width:70%;"
                :hide-required-asterisk='true'>
            <el-form-item label="分类名称:" prop="name">
                <el-input style="width: 100%" v-model="sort.name" placeholder="请输入分类名称"
                          :disabled="editTitle !== '添加分类'"
                          :clearable="true">
                </el-input>
            </el-form-item>
            <el-form-item label="样式预览:">
                <div style="display: flex;justify-content: flex-start; width: 100%">
                    <div class="sortStyleBorder">
                        <el-tag size="mini" v-if="sort.name" effect="plain" :style="sort.nameColor">{{sort.name}}
                        </el-tag>
                        <span style="color: #C0C4CC ;font-size: 12px" v-if="!sort.name">分类样式预览</span>
                    </div>
                    <el-color-picker size="mini" v-model="nameStyleColor"></el-color-picker>
                    <span style="font-size: 10px ;color: #909399; margin-left: 5px">选择分类颜色</span>
                </div>
            </el-form-item>
            <el-form-item label="描述:" prop="descripation">
                <el-input
                        style="width: 100%"
                        type="textarea"
                        rows="3"
                        v-model="sort.descripation"
                        placeholder="请输入分类描述..."
                        maxlength="30"
                        show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialog = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="editSort">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>


    export default {
        name: "sortEdit",
        props: {
            sortEditParam: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            //校验添加的分类名称是否重名
            var chackSortName = (rule, value, callback) => {
                this.chackSortNameAjax(rule, value, callback);
            };
            return {
                dialog: false,
                editTitle: '',
                nameStyleColor: '#909399',   //样式颜色
                sort: {
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
                        {require: true, message: '请输入分类名称', target: blur},
                        {min: 3, max: 10, message: "长度在3到5个字符之间", target: blur},
                        {validator: chackSortName, trigger: "blur"}
                    ],
                    descripation: [
                        {require: true, message: '请输入分类描述说明', target: blur},
                        {min: 3, max: 30, message: "长度在3到30个字符之间", target: blur}
                    ]
                }
            }
        },
        watch: {
            //检测到sort 参数变化时开启分类编辑页
            sortEditParam: {
                deep: true, //深度检测
                handler(val) {
                    //开启编辑窗口
                    this.dialog = val.dialogVisible
                    //更新title
                    this.editTitle = val.editTitle
                    if (val.sort.id && this.dialog) {
                        this.sort = JSON.parse(JSON.stringify(val.sort))
                        this.nameStyleColor = val.sort.nameStyleColor
                    }
                }
            },
            //检测到开启编辑页的变化后更新到父组件,并还原编辑页内容
            dialog(val) {
                if (!val) {
                    this.$emit("change—dialog", val);
                    this.nameStyleColor = '#909399';
                    this.sort = {
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
            //检测到样式颜色改变时，修改标签的样式颜色
            nameStyleColor(val) {
                this.sort.nameStyleColor = val
                this.sort.nameColor.borderColor = val;
                this.sort.nameColor.color = val
            }
        },
        methods: {
            //编辑分类
            editSort() {
                if (this.editTitle === "添加分类") {
                    this.addSort()
                } else {
                    this.updateSort()
                }
            },

            //异步检查添加的是否重名
            chackSortNameAjax(rule, value, callback) {
                if (this.editTitle === '添加分类' && value !== '') {
                    this.getRequest(`/sort/check/${value}`).then(resp => {
                        if (resp) {
                            //存在相同的分类名称
                            callback(new Error("输入的分类名称已存在"));
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
            //添加分类
            addSort() {
                this.$refs["sortForm"].validate(valid => {
                    if (valid) {
                        this.postRequest("/sort/", this.sort).then(resp => {
                            if (resp) {
                                this.dialog = false
                                this.$emit("update-initSorts")
                            }
                        }).catch(error => {
                            this.$message.error(error.response.message)
                        })
                    }
                })
            },
            //更新分类
            updateSort() {
                this.putRequest("/sort/", this.sort).then(resp => {
                    if (resp) {
                        this.dialog = false
                        this.$emit("update-initSorts")
                    }
                }).catch(error => {
                    this.$message.error(error.response.message)
                })
            }
        }
    }
</script>
<style>
    .sortStyleBorder {
        border: 1px #DCDFE6 solid;
        border-radius: 4px;
        height: 32px;
        width: 180px;
        padding: 0 14px;
        box-sizing: border-box;
        margin-right: 5px;

    }
</style>