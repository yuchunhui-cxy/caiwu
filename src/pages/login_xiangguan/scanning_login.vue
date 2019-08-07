<template>
    <div class="bg">
        <div style="border-radius: 10px;background: white;width: 500px;height: 500px;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;display: flex;justify-content: center;align-items: center">
            <div id="div" style="z-index: 100;">

            </div>
            <!--密码登录-->
            <div style="position: absolute;bottom: 30px;right: 30px;">
                <a href="#" style="text-decoration: none;font-size: 16px;color: #008CFF;" @click.prevent="$router.push('/password_login')">密码登录</a>

            </div>

            <!--<button @click="$router.push({path:'/',query:{'code':1}})">111</button>-->
.
        </div>

        <!--<div @click="$router.push('/home')">假如扫成功进去了</div>-->
    </div>
</template>

<script>
    import aaa from "@/pages/zujian"
    export default {
        name: "scanning_login",
        data(){
          return {
              // code:!this.$route.query.code? 0 : this.$route.query.code,
          }
        },

        mounted(){
            var obj = new WxLogin({
                id:"div",    //div的id
                appid: "wx3b976ef54d06d852",
                scope: "snsapi_login",
                redirect_uri:"https%3a%2f%2fshujiecaishui.com%2ffinance_system%2f%23%2f",     //回调地址
                state: "",　　　　　　　　　//参数，可带可不带
                style: "",　　　　　　　　　//样式  提供"black"、"white"可选，默认为黑色文字描述
                href: ""                 //自定义样式链接，第三方可根据实际需求覆盖默认样式。
            });
            // if (this.code != 0) {
            //     this._ajax('weChatWeb/getUserInfo', {
            //         code:"0611pbM92CTNxK0lokM92RugM921pbM5"
            //     }, msg => {
            //         localStorage.setItem('user',JSON.stringify(msg))
            //         localStorage.setItem('uuid',JSON.stringify(msg.user_uuid))
            //         console.log(msg)
            //         if(msg.flag5 == 0){
            //             this.$router.push("/entry_company_message")
            //         }else if(msg.flag5 == 1){
            //             this.$router.push("/home")
            //         }
            //     })
            // }

            // if(window.location.href.includes("code")){
            //
            //     console.log(window.location.href.split("=")[1].split("&")[0])
            //     this._ajax('weChatWeb/login', {
            //         code:window.location.href.split("=")[1].split("&")[0]
            //     }, msg => {
            //
            //         console.log(msg)
            //
            //     })
            // }


        },
        watch:{
            $route(to,from){
                if (this.$route.query.code){

                    this._ajax('weChatWeb/getUserInfo', {
                        code:this.$route.query.code
                    }, msg => {
                        localStorage.setItem('user',JSON.stringify(msg))
                        localStorage.setItem('uuid',JSON.stringify(msg.uuid))
                        // 没录入公司第一次扫码登录
                        if(msg.flag5 == 0 && msg.user_wechat_flag == 0){
                            this._message(1,'登录成功')
                            this.$router.push({path:"/bind_phone"})
                        // 录入公司之前扫过
                        }else if(msg.flag5 == 1 && msg.user_wechat_flag == 1){
                            this._message(1,'登录成功')
                            this.$router.push("/home")
                        //录入过公司并且第一次扫
                        }else if(msg.flag5 == 1 && msg.user_wechat_flag == 0){
                            this._message(1,'登录成功')
                            this.$router.push("/home")
                            //
                        }else if(msg.flag5 == 0 && msg.user_wechat_flag == 1){
                            this._message(1,'登录成功')
                            this.$router.push({path: '/entry_company_message'});

                        }

                    })
                }
            }
            // code:{
            //     handler(n,o){
            //         if (n != 0){
            //             alert(1)
            //
            //         this._ajax('weChatWeb/getUserInfo', {
            //                 code:this.$route.query.code
            //             }, msg => {
            //                 localStorage.setItem('user',JSON.stringify(msg))
            //                 localStorage.setItem('uuid',JSON.stringify(msg.uuid))
            //                 console.log(msg)
            //                 if(msg.flag5 == 0){
            //                     this._message(1,'登录成功')
            //                     this.$router.push("/entry_company_message")
            //                 }else if(msg.flag5 == 1){
            //                     this._message(1,'登录成功')
            //                     this.$router.push("/home")
            //                 }
            //             })
            //         }
            //     },
            //     immediate: true
            // }


        },
        components: {
            aaa
        },
        methods:{

        }
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: url("https://company-webimage.oss-cn-beijing.aliyuncs.com/bg.b4b5636.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;
    }

</style>