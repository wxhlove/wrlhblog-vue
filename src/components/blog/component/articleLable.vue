<template>
    <div>
        <div>
            <el-row>
                <!--  条件搜索 -->
                <el-col :span="18">
                    <el-row>
                        <el-col :span="8">
                            <span style="font-size: 13px;color: #606266 ;margin-right: 8px">标签名称:</span>
                            <el-input size="mini" v-model="lableName" placeholder="请输入标签名称..."
                                      @keydown.enter.native="initLables" style="width: 60%" :clearable="true"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <span style="font-size: 13px;color: #606266 ;margin-right: 8px">添加时间段:</span>
                            <el-date-picker
                                    size="mini"
                                    v-model="searchTime"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 60%">
                                <!--                                    :picker-options="pickerOptions"-->
                            </el-date-picker>
                        </el-col>
                        <el-col :span="8">
                            <el-button icon="el-icon-search" type="primary" @click="initLables" size="mini">开始搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- 添加标签 -->
                <el-col :span="6">
                    <el-button @click="openAddLable" icon="el-icon-plus" type="success" size="mini"
                               style="float: right">添加标签
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top: 15px">
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
                                @click.native.prevent="editLableRow(scope.row)"
                                type="primary"
                                size="mini">
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteLableRow(scope.row)"
                                type="danger"
                                size="mini">
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
                lableName: '',
                startTime: null,
                endTime: null,
                searchTime: null,
                currentPage: 1, //当前页
                total: 0,//总条数
                pageSize: 10, //每页条数
                prevText: '上一页',
                nextText: '下一页',
                lables: [],
                lableEditParam: {
                    dialogFormVisible: false,
                    editTitle: '',
                    lable: {}
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
                //动态拼接url
                let url = `/lable/${this.currentPage}/${this.pageSize}/?`
                if (this.lableName != null && this.lableName !== '') {
                    url += `lableName=${this.lableName}&`
                }
                if (this.startTime != null && this.endTime != null) {
                    url += `startTime=${this.startTime}&endTime=${this.endTime}&`
                }
                this.getRequest(url).then(resp => {
                    if (resp) {
                        this.lables = resp.objList;
                        this.total = resp.total
                    }
                }).catch(error => {
                    this.$message.error("查询标签列表失败")
                })

            },
            //编辑当前行
            editLableRow(row) {
                this.lableEditParam.dialogFormVisible = true
                this.lableEditParam.editTitle = '编辑分类'
                this.lableEditParam.lable = JSON.parse(JSON.stringify(row))
            },
            //删除当前行
            deleteLableRow(row) {

                this.$confirm('此操作将永久删除 标签 [ ' + row.name + ' ], 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.deleteRequest(`/lable/${row.id}`).then(resp => {
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
            //打开添加标签窗口
            openAddLable() {
                this.lableEditParam.dialogFormVisible = true
                this.lableEditParam.editTitle = "添加标签"
                this.lableEditParam.lable = {}
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
        },
        watch: {
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