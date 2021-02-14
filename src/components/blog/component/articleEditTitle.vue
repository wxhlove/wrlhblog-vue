<template>
    <div>
        <el-form size="mini">
            <!--layout 布局容器-->
            <el-row style="display: flex;flex-wrap: wrap">
                <!--第一列-->
                <el-col :span="12" class="el-col-1">
                    <div>
                        <!--第一列第一行-->
                        <el-form-item label="标题(文章标题):">
                            <el-input placeholder="请输入标题..." v-model="articleTitle.title"
                                      style="width: 82%;"></el-input>
                        </el-form-item>
                        <!--第一列第二行-->
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="文章类别:">
                                    <el-select style="width: 70%;" clearable placeholder="类别选项"
                                               v-model="articleTitle.sid">
                                        <el-option
                                                v-for="item in sorts"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="预发布时间:">
                                    <el-date-picker
                                            v-model="articleTitle.piblishTime"
                                            type="date"
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions"
                                            style="width: 70%">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 第一列第三行-->
                        <el-form-item label="标签(多选):">
                            <el-select multiple placeholder="请选择" style="width:86%" v-model="articleTitle.lid">
                                <el-option
                                        v-for="item in lables"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <!--第四行总结-->
                        <el-form-item label="总结:">
                            <el-input type="textarea" v-model="articleTitle.summary"
                                      placeholder="文章简短总结(总字符数不超过50字，总行数不超过三行...)"
                                      maxlength="30"
                                      show-word-limit
                                      :rows="3"
                                      style="width: 90.5%"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <!--第二列-->
                <el-col :span="12" class="el-col-2">
                    <!--第二列上传图片内容-->
                    <div>
                        <el-upload
                                size="small"
                                name="file"
                                :action="uploadUrl"
                                list-type="picture"
                                :multiple="false"
                                :on-success="onSuccess"
                                :on-remove="onRemove"
                                :limit="1"
                                :file-list="fileList">
                            <el-button size="small" type="primary">总结背景图片上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    //博客编辑title 部分
    export default {
        name: "articleEditTitle",
        data() {
            return {
                sorts: [],
                lables: [],
                articleTitle: { //博客文章title
                    title: '',
                    sid: '', //分类id
                    lid: [], //标签id数组
                    piblishTime: null, //发布时间
                    summary: '', //总结
                    imageUrl: '' //总结背景图片
                },
                pickerOptions: {
                    disabledDate(time) {
                        let pickerTime = time.toLocaleDateString().replaceAll("/", "-");
                        var nowTime = new Date().toLocaleDateString().replaceAll("/", "-");
                        return new Date(pickerTime) < new Date(nowTime)
                    }
                },
                fileList: [],
                uploadUrl: 'http://127.0.0.1:8070/article/uploadTitlePicture/',
                value: '',
                value1: ''
            }
        },
        mounted() {
            //初始化分类数组
            this.initSorts();
            //初始化标签数组
            this.initLables();

        },
        watch: {
            fileList: function (val) {
                console.log("val ==> " + JSON.stringify(val))
            }
        },
        methods: {
            //初始化分类数组
            initSorts() {
                this.getRequest("/sort/").then(resp => {
                    if (resp) {
                        this.sorts = resp.objList;
                    }
                }).catch(error => {
                    this.$message.error(error.response.message)
                })
            },
            //初始标签数组
            initLables() {
                this.getRequest("/lable/").then(resp => {
                    if (resp) {
                        this.lables = resp.objList;
                    }
                }).catch(error => {
                    this.$message.error(error.response.message)
                })
            },

            //文件上传成功
            onSuccess(response, file) {
                if (response.code === "200") {
                    this.articleTitle.imageUrl = response.data
                }
                console.log("imageUrl ==> " + this.articleTitle.imageUrl)
            },
            //移除文件
            onRemove(file) {
                console.log(" ==> " + JSON.stringify(file))
            }

        }
    }
</script>

<style>
    .el-col-1 {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 49%;
        padding: 10px;
    }

    .el-col-2 {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-left: 1%;
        padding: 10px;
    }

</style>