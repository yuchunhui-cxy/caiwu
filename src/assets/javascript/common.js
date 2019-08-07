// import axios from 'axios'
import {post, fetch, patch, put} from '@/http/http.js'

export default {
    install(Vue, options) {
            // 192.168.1.177:8080 徐青
            // Vue.prototype.url = "http://39.107.137.98:8080/tuangou/",          //测试服务器路径
            // Vue.prototype.url = "http://39.105.187.204:8080/finance/",          //测试服务器路径
            // Vue.prototype.url = "http://123.56.97.151:8080/finance/",
            Vue.prototype.url = "https://shujiecaishui.com/finance/",
            Vue.prototype.$http = {post, fetch, patch, put},                   //axiox封装请求函数
            Vue.prototype.$ali = {                                             //阿里云OSS key参数
                region: 'oss-cn-beijing',
                accessKeyId: 'LTAIcI5PIWHua6L5',
                accessKeySecret: 'K64ojjB8jKqgIcp69Hk9E6IEBeqW3s',
                bucket: 'shujiecaiwu'
            },
            // Vue.prototype.aliurl = 'https://shujiecaiwu.oss-cn-beijing.aliyuncs.com/', //阿里云拼接路径
            Vue.prototype._ajax = function (url, option, callback,hedas) {
                if (hedas == undefined) {
                    hedas = {}
                }
                post(Vue.prototype.url + url, option,hedas).then(resp => {
                    if (resp.state == 1) {
                        callback(resp.data);
                    } else {
                        Vue.prototype.$message({
                            message: resp.message,
                            type: 'warning'
                        })
                    }
                }, error => {
                    Vue.prototype.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                })
            },
            // 因为使用次数太多, 对elementUI的message进行了二次封装
            Vue.prototype._message = function (type, msg) {
                let txt = '';
                switch (type) {
                    case 1:
                        txt = 'success';
                        break;
                    case 2:
                        txt = 'warning';
                        break;
                    case 3:
                        txt = 'error';
                        break;
                    default:
                        txt = 'info';
                }
                Vue.prototype.$message({
                    message: msg,
                    type: txt
                });
            }

    }
}
