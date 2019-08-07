<template>
    <div class="ali-box">
        <input
            class="oss-btn"
            ref="SlideInput"
            type="file"
            @change="uploadAli($event)"
            accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
        <el-button
            style="position: absolute;padding: 3px;"
            @click=""
            type="text">新增
        </el-button>
    </div>
</template>

<script>
    import OSS from "ali-oss";

    export default {
        name: "OSSBtn",
        methods: {
            uploadAli(event) {
                const _this = this;
                const file = event.srcElement.files[0];
                if (file == undefined) {
                    return;
                }
                //创建名称
                let file_suffix = file.name.substr(file.name.lastIndexOf("."));
                let file_name = Date.parse(new Date()) / 1000 + file_suffix;
                const client = new OSS.Wrapper(this.$ali);
                client
                    .multipartUpload(file_name, file, {
                        // progress: function* (p) {
                        //     console.log("Progress: " + p);
                        // }
                    })
                    .then(function (result) {
                        _this.$message({
                            message: "上传成功!",
                            type: "success"
                        });
                        console.log(result.name)
                        console.log(222)
                        _this.$emit('requireImg', result.name)
                    })
                    .catch(function (err) {
                        _this.$message({
                            message: "上传失败!",
                            type: "error"
                        });
                    });
            }
        }
    }
</script>

<style scoped>
    .ali-box {
        position: relative;
        height: 36px;
    }

    .oss-btn {
        width: 36px;
        height: 20px;
        overflow: hidden;
        opacity: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
        z-index: 99;
    }
</style>
