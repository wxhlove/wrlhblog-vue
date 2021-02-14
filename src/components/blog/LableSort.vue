<template>
    <div style="padding: 10px">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key"
                         style="height:auto">
                <keep-alive>
                    <articleSort v-if="item.key === 'sort'"/>
                    <article-lable v-if="item.key === 'lable'"/>
                    <article-dic v-else/>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import articleSort from "./component/articleSort";
    import articleLable from "./component/articleLable";
    import articleDic from "./component/articleDic";

    export default {
        name: "LableSort",
        components: {
            articleSort, //文章分类
            articleLable, //文章标签
            articleDic, //数据字典管理
        },
        data() {
            return {
                tabMapOptions: [
                    {label: '分类管理', key: 'sort'},
                    {label: '标签管理', key: 'lable'},
                    {label: '数据字典', key: "dic"}
                ],
                activeName: 'sort'
            }
        },
        watch: {
            activeName(val) {
                this.$router.push(`${this.$route.path}?tab=${val}`)
            }
        },
        created() {
            const tab = this.$route.query.tab
            if (tab) {
                this.activeName = tab
            }
        }
    }
</script>

<style>
    .el-radio-button__inner {
        border: 1px #DCDFE6 solid;
    }

    .el-radio-button:first-child .el-radio-button__inner {
        border-radius: 5px;
    }

    .el-radio-button:last-child .el-radio-button__inner {
        border-radius: 5px;
    }
</style>