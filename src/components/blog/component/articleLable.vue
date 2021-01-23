<template>
    <div>
        <div>
            <el-row>
                <!--  条件搜索 -->
                <el-col :span="18">
                    <el-form size="mini">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="标签名称:">
                                    <el-input placeholder="请输入标签名称..." style="width: 60%"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="添加时间段:">
                                    <el-date-picker
                                            v-model="value2"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                            style="width: 60%">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-button icon="el-icon-search" type="primary" size="mini">开始搜索</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
                <!-- 添加标签 -->
                <el-col :span="6">
                    <el-button @click="openAddLable" icon="el-icon-plus" type="success" size="mini"
                               style="float: right">添加标签
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="lables"
                    max-height="150"
                    border
                    size="mini"
                    :cell-style="{'text-align':'center'}"
                    :header-cell-style="{'text-align':'center'}"
                    style="width: 100% ;">
                <el-table-column
                        label="序号"
                        type=index
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="标签名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="样式"
                        width="200">
                    <template slot-scope="scope">
                        <el-tag size="mini" effect="plain" :style="scope.row.nameColor">{{scope.row.name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="addUsername"
                        label="添加人用户名"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="addTime"
                        label="添加时间"
                        :formatter="dateFormatter"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="descripation"
                        label="描述"
                        width="500">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="editLableRow(scope.$index, tableData)"
                                type="primary"
                                size="mini">
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteLableRow(scope.$index, tableData)"
                                type="danger"
                                size="mini">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--  编辑添加标签组件-->
        <lable-edit
                @update-initLables="updateInitLables"
                @change—dialog="changeDialog"
                :lable-edit-param="lableEditParam"/>
    </div>
</template>

<script>
    //文章标签
    import lableEdit from "./lableEdit";
    import moment from "moment";

    export default {
        name: "articleLable",
        components: {
            lableEdit
        },

        data() {
            return {
                lables: [],
                value2: '',
                lableEditParam: {
                    dialogFormVisible: false,
                    editTitle: ''
                }
            }
        },
        mounted() {
            //页面加载时即初始化标签列表
            this.initLables()

        },
        methods: {
            //初始化获取标签列表
            initLables() {
                this.getRequest("/lable/").then(resp => {
                    if (resp) {
                        this.lables = resp
                    }
                }).catch(error => {
                    this.$message.error("查询标签列表失败")
                })

            },
            //编辑当前行
            editLableRow(index, rows) {

            },
            //删除当前行
            deleteLableRow(index, rows) {

            },
            //打开添加标签窗口
            openAddLable() {
                this.lableEditParam.dialogFormVisible = true
                this.lableEditParam.editTitle = "添加标签"
            },
            //修改从子组件传过来的值
            changeDialog(val) {
                this.lableEditParam.dialogFormVisible = val
            },
            //添加标签后刷新lables列表
            updateInitLables() {
                this.initLables();
            },
            //列表时间格式化
            dateFormatter(row, column) {
                let date = row[column.property]
                if (date === undefined) {
                    return '';
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style>

</style>