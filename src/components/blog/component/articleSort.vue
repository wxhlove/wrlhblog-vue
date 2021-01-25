<template>
    <div>
        <!--   头部搜寻栏-->
        <div>
            <div>
                <el-row>
                    <!--   搜索部分-->
                    <el-col :span="18">
                        <el-row>
                            <el-col :span="8">
                                <span style="font-size: 13px;color: #606266 ;margin-right: 8px">分类名称:</span>
                                <el-input size="mini" v-model="sortName" placeholder="请输入分类名称..."
                                          @keydown.enter.native="initSorts" style="width: 60%"
                                          :clearable="true"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <span style="font-size: 13px;color: #606266 ;margin-right: 8px">添加时间段:</span>
                                <el-date-picker
                                        size="mini"
                                        v-model="searchTime"
                                        type="daterange"
                                        align="right"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd"
                                        style="width: 60%">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="8">
                                <el-button @click="initSorts" size="mini" icon="el-icon-search" type="primary">搜索标签
                                </el-button>
                            </el-col>
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
        <div style="margin-top: 15px">
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
                        label="添加人用户名"
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
                                @click.native.prevent="editSortRow(scope.row)">
                            编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click.native.prevent="deleteSortRow(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top: 10px;float: right">
            <el-pagination
                    size="mini"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :hide-on-single-page="total <= 10"
                    :page-size="pageSize"
                    :prev-text="prevText"
                    :next-text="nextText"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
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
                searchTime: null,
                sortName: '',
                startTime: null,
                endTime: null,
                currentPage: 1, //当前页
                total: 0,//总条数
                pageSize: 10, //每页条数
                prevText: '上一页',
                nextText: '下一页',
                sorts: [],
                sortEditParam: {
                    dialogVisible: false,
                    editTitle: '',
                    sort: {}
                },
            }
        },
        mounted() {
            //初始化分类列表
            this.initSorts();
        },
        methods: {
            //初始化分类列表
            initSorts() {
                //动态拼接url
                let url = `/sort/${this.currentPage}/${this.pageSize}/?`
                if (this.sortName != null && this.sortName !== '') {
                    url += `sortName=${this.sortName}&`
                }
                if (this.startTime != null && this.endTime != null) {
                    url += `startTime=${this.startTime}&endTime=${this.endTime}&`
                }

                this.getRequest(url, this.solsearchcondition).then(resp => {
                    if (resp) {
                        this.sorts = resp.objList;
                        this.total = resp.total;
                    }
                })
            },
            //编辑当前行
            editSortRow(row) {
                this.sortEditParam.dialogVisible = true
                this.sortEditParam.editTitle = '编辑分类'
                this.sortEditParam.sort = JSON.parse(JSON.stringify(row))
            },
            //删除当前行
            deleteSortRow(row) {

                this.$confirm('此操作将永久删除 分类 [ ' + row.name + ' ], 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.deleteRequest(`/sort/${row.id}`).then(resp => {
                        //删除当前行
                        if (resp) {
                            this.initSorts();
                        }
                    }).catch(error => {
                        this.$message.error(error.response.messagezxl)
                    })

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            //分页内容
            handleSizeChange(val) {
                this.pageSize = val;
                this.initLables();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initLables();
            },


            //添加分类添加窗口
            openAddSort() {
                this.sortEditParam.dialogVisible = true
                this.sortEditParam.editTitle = '添加分类'
                this.sortEditParam.sort = {}
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
        },
        watch: {
            //检测时间选择器
            searchTime(val) {
                if (val) {
                    var dateTimes = this.searchTime.toString().split(",");
                    this.startTime = dateTimes[0];
                    this.endTime = dateTimes[1];
                } else {
                    this.startTime = null
                    this.endTime = null
                }
            }
        }
    }
</script>

<style>

</style>