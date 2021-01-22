<template>
    <mavonEditor
            ref=md
            v-model="markContent"
            :shortCut="false"
            :ishljs = "true"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
    >
    </mavonEditor>
</template>

<script>
    //markDown 编辑器
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'


    export default {
        name: "markDown",
        components: {
            mavonEditor
        },
        data() {
            return {
                markContent: '', //输入的markdoen 文本内容


            }
        },
        methods: {
            //绑定$imageAdd event 事件，图片上传并替换链接
            $imgAdd(pos, $file) {
                //将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.postImageUpload('', '').then(resp => {
                    // 将返回的url替换到文本原位置![...](0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    $vm.$img2Url(pos, resp.data);

                }).catch(error => {
                    //失败时弹出提示窗口
                    this.$message.error(error.response.message)
                })

            },
            //绑定$imgDel event 事件，删除图片
            $imgDel(pos, $file) {

            }

        }
    }
</script>

<style>

</style>