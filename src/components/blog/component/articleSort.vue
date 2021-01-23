<template>
    <div>
        <!--   头部搜寻栏-->
        <div>
            <div>
                <el-row>
                    <!--   搜索部分-->
                    <el-col :span="18">
                        <el-row>
                            <el-form size="mini">
                                <el-col :span="8">
                                    <el-form-item label="分类名称:">
                                        <el-input placeholder="请输入分类名称..." style="width: 60%"></el-input>
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
                                    <el-button size="mini" icon="el-icon-search" type="primary">搜索标签
                                    </el-button>
                                </el-col>
                            </el-form>
                        </el-row>
                    </el-col>
                    <!--   添加部分-->
                    <el-col :span="6">
                        <el-button style="float: right" @click="openAddSort"
                                   icon="el-icon-plus" @ type="success"
                                   size="mini">添加分类
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--  列表部分-->
        <div style="margin-top: 10px">
            <el-table
                    :data="sorts"
                    max-height="150"
                    border
                    size="mini"
                    :cell-style="{'text-align':'center'}"
                    :header-cell-style="{'text-align':'center'}"
                    style="width: 100% ;">
                <el-table-column
                        label="序号"
                        width="50"
                        type="index">
                </el-table-column>
                <el-table-column
                        label="分类名称"
                        prop="name"
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
                        label="" 添加人用户名
                        prop="addUsername"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="添加时间"
                        prop="addTime"
                        width="300"
                        :formatter="dateFormt">
                </el-table-column>
                <el-table-column
                        label="描述"
                        prop="descripation"
                        width="500">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click.native.prevent="editSortRow(scope.$index, tableData)">
                            编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click.native.prevent="deleteSortRow(scope.$index, tableData)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <sort-edit
                @update-initSorts="updateInitSorts"
                @change—dialog="changeDialog"
                :sort-edit-param="sortEditParam"/>
    </div>
</template>

<script>
    import sortEdit from "./sortEdit";
    import moment from 'moment'

    //文章分类
    export default {
        name: "articleSort",
        components: {
            sortEdit
        },
        data() {
            return {
                value2: '',
                sorts: [],
                sortEditParam: {
                    dialogVisible: false,
                    editTitle: ''
                }
            }
        },
        mounted() {
            //初始化分类列表
            this.initSorts();
        },
        methods: {
            //初始化分类列表
            initSorts() {
                this.getRequest("/sort/").then(resp => {
                    if (resp) {
                        this.sorts = resp
                    }
                })
            },
            //编辑当前行
            editSortRow(index, rows) {

            },
            //删除当前行
            deleteSortRow(index, rows) {

            },
            //打开分类添加窗口
            openAddSort() {
                this.sortEditParam.dialogVisible = true
                this.sortEditParam.editTitle = '添加分类'
            },

            //时间格式化
            dateFormt(row, column) {
                let date = row[column.property]
                if (date === undefined) {
                    return ''
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },

            //子组件方法，更新开启编辑页状态
            changeDialog(val) {
                this.sortEditParam.dialogVisible = val
            },
            //添加分类成功后刷新分类列表
            updateInitSorts() {
                this.initSorts()
            }
        }
    }
</script>

<style>

</style>