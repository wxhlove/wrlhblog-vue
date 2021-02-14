<template>
    <div style="padding: 10px">
        <!--发布草案等-->
        <div style="display: flex ; justify-content: space-between">
            <div>
                <span style="color: deeppink;font-size: 20px">文章编辑</span>
            </div>

            <div class="article_edit_operation">
                <div>
                    <el-tooltip :disabled="!isDisable" placement="bottom" effect="light"
                                :content="editModelTipsContent">
                        <el-radio-group size="mini" v-model="editModel" :disabled="isDisable">
                            <el-radio-button label="markdown">markdown</el-radio-button>
                            <el-radio-button label="富文本">富文本</el-radio-button>
                        </el-radio-group>
                    </el-tooltip>
                </div>
                <el-button style="margin-left: 5px" size="mini" round type="warning">重置编辑</el-button>
                <el-button style="margin-left: 5px" size="mini" round type="primary">保存为草稿</el-button>
                <el-button style="margin-left: 5px" size="mini" round type="success">立即发布</el-button>
            </div>
        </div>
        <!--TITLE等部分-->
        <article-edit-title ></article-edit-title>
        <!--编辑部分-->
        <div style="padding-top: 10px">
            <mark-down v-if="editModel === 'markdown'"></mark-down>
            <vue-quill-editor v-else></vue-quill-editor>
        </div>
    </div>
</template>

<script>
    import articleEditTitle from './component/articleEditTitle'
    import markDown from "./component/markDown";
    import vueQuillEditor from "./component/vueQuillEditor";

    export default {
        name: "ArticleEdit",
        components: {
            articleEditTitle,
            markDown,
            vueQuillEditor,
        },
        data() {
            return {
                editModelTipsContent: '当前不能切换，请重置或清空内编辑器内容后在切换', //文本编辑模式切换提示内容
                isDisable: false, //是否禁用切换文档编辑器
                editModel: 'markdown' //文本编辑模式
            }
        }
    }
</script>

<style>
    .article_edit_operation {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
</style>