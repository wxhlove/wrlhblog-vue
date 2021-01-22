<template>
    <quillEditor></quillEditor>
</template>

<script>
    //富文本编辑器
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor} from 'vue-quill-editor'

    export default {

        name: "vueQuillEditor",
        components: {
            quillEditor
        }
    }
</script>
<style>

</style>