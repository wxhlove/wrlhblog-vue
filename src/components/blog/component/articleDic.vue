<template>
    <div>
        <!--头部信息-->
        <div style="display: flex;justify-content: flex-start">


        </div>
        <!--table-->
        <div>
            <el-table
                    :data="dataDics"
                    border
                    max-height="150"
                    size="mini"
                    :cell-style="{'text-align':'center'}"
                    :header-cell-style="{'text-align':'center'}"
                    width="100%"
            >

                <el-table-column
                        label="序号"
                        width="50"
                        type="index">
                </el-table-column>
                <el-table-column
                        label="字典代码"
                        prop="dicCode"
                        width="250">
                </el-table-column>
                <el-table-column
                        label="字典名称"
                        prop="dicName"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="字典内容"
                        prop="dataContent"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="内容单位"
                        prop="company"
                        width="90">
                </el-table-column>
                <
                <el-table-column
                        label="字典类型"
                        prop="type"
                        width="90">
                </el-table-column>
                <el-table-column
                        label="当前状态"
                        width="90">
                    <template slot-scope="scope">
                     <el-tag v-if="scope.row.state"  type="success" size="mini">激活</el-tag>
                     <el-tag v-else type="danger" size="mini">禁用</el-tag>
                    </template>


                </el-table-column>

                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="150"
                        :formatter="dateFormat">
                </el-table-column>
                <el-table-column
                        label="更新时间"
                        prop="updateTime"
                        width="150"
                        :formatter="dateFormat">
                </el-table-column>
                <el-table-column
                        label="描述"
                        prop="describe"
                        width="400">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                    </template>
                </el-table-column>


            </el-table>

        </div>
        <!--分页部分-->
        <div>

        </div>
    </div>
</template>

<script>

    import moment from 'moment';

    //数据管理
    export default {
        name: "articleDic",
        data() {
            return {
                dataDics: []
            }
        },
        mounted() {
            //初始化数据字典
            this.initDataDics()


        },
        methods: {

            //初始化数据字典
            initDataDics() {
                this.getRequest("/dataDic/").then(resp => {
                    if (resp) {
                        this.dataDics = resp.objList
                    }
                })
            },

            //时间格式化
            dateFormat(row, column) {
                let date = row[column.property];
                if (date === undefined) {
                    return ''
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style>

</style>