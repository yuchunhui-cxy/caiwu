<template>
    <div class="clearfix">
        <div
            v-for="(item, index) in fileArr"
            :key="index"
            class="hj-upload f-l hj-show">
            <video
                width="100%"
                height="100%"
                :src="aliurl + item"
                controls="controls"
            ></video>
            <i class="el-icon-delete hj-icon" @click="remoFile(index)"></i>
        </div>
        <!-- 上传图片组件(阿里云) -->
        <div class="hj-upload f-l" v-if="fileArr.length != fileNumber"  v-loading="loading" element-loading-text="拼命上传中">
            <input
                ref="imgpt"
                type="file"
                class="hj-ipt"
                @change="uploadAli($event)"
                :accept="fileType">
            <i class="el-icon-plus hj-load"></i>
        </div>
    </div>
</template>

<script type="text/javascript">
    import OSS from "ali-oss";

    export default {
        name: "UploadAli",
        data() {
            return {
                fileName: [],
                fileArr: [],
                loading: false
            };
        },
        created() {
            if (this.defaultImg !== "") {
                this.fileArr.push(this.defaultImg);
                console.log('有图片')
            }
        },
        updated() {
            if (this.$refs.imgpt !== undefined) {
                this.$refs.imgpt.value = '';
            }
        },
        watch: {
            fileArr(val, oldval) {
                this.$emit("getUrl", val);
            },
            defaultImg(val, oldval) {
                if (val !== "") {
                    this.fileArr = [];
                    this.fileArr.push(this.defaultImg);
                } else {
                    this.fileArr = []
                }
            }
        },
        methods: {
            clearUrl() {
                this.fileArr = [];
                this.fileName = [];
            },
            remoFile(index) {
                this.fileArr.splice(index, 1);
                this.fileName.splice(index, 1);
            },
            imgError(e) {
                //图片加载失败函数;
                e.target.src = "./static/error.png";
            },
            magnifier(url) {
                //查看大图函数;
                const h = this.$createElement;
                this.$msgbox({
                    title: "图片查看",
                    message: h("img", {
                        attrs: {
                            src: this.aliurl + url
                        },
                        style: {
                            width: "100%"
                        },
                        on: {
                            error(e) {
                                e.target.src = "./static/error.png";
                            }
                        }
                    })
                });
            },
            uploadAli(event) {
                this.loading=true
                //上传至阿里云OSS函数
                const _this = this;
                const file = event.srcElement.files[0];
                if (file == undefined) {
                    return;
                }
                /*if (_this.fileName.indexOf(file.name) >= 0) {
                    //检测图片是否上传过,如果长传过提示并退出;
                    _this.$message({
                        message: "你好像上传过这张图片了!",
                        type: "warning"
                    });
                    return;
                }*/
                //创建名称
                _this.fileName.push(file.name);
                let file_suffix = file.name.substr(file.name.lastIndexOf("."));
                let file_name = Date.parse(new Date()) / 1000 + file_suffix;
                const client = new OSS.Wrapper(this.$ali);
                client
                    .multipartUpload(file_name, file, {
                        progress: function* (p) {
                            console.log("Progress: " + p);
                        }
                    })
                    .then(function (result) {
                        _this.$message({
                            message: "上传成功!",
                            type: "success"
                        });
                        _this.loading=false
                        _this.fileArr.push(result.name);
                    })
                    .catch(function (err) {
                        _this.$message({
                            message: "上传失败!",
                            type: "error"
                        });
                        _this.loading=false
                    });
            }
        },
        props: {
            fileType: {
                type: String,
                default() {
                    return "image/jpg,image/png,image/gif,image/jpeg,,image/svg";
                }
            },
            fileNumber: {
                type: Number,
                default() {
                    return 999;
                }
            },
            defaultImg: {
                type: String,
                default() {
                    return "";
                }
            }
        }
    };
</script>

<style type="text/css" scoped>
    .hj-upload {
        width: 200px;
        height: 200px;
        border: 1px dashed blue;
        border-radius: 6px;
        position: relative;
        margin: 5px;
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    .hj-upload > video {
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .hj-load {
        color: #8a8aec;
        font-weight: 700;
        width: 80px;
        height: 80px;
        font-size: 80px;
        position: absolute;
        left: 60px;
        top: 60px;
    }

    .hj-upload:hover {
        border-style: solid;
    }

    .hj-ipt {
        position: absolute;
        width: 200px;
        height: 200px;
        z-index: 999;
        opacity: 0;
    }

    .hj-icon {
        color: #ff0200;
        margin-left: 80px;
        font-size: 30px;
        display: none;
        position: relative;
        z-index: 999;

    }

    .hj-show:hover .hj-icon {
        display: block;
    }
</style>
