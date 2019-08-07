<template>
    <div class="hj-login">
        <div class="hj-login-form" style="display: flex;justify-content: center;align-items: center">
            <div>
                <el-form
                        ref="user"
                        label-width="110px"
                        :model="user"
                        :rules="rules2">
                    <el-form-item label="手机号：+ 86" prop="phone">
                        <el-input type="text" placeholder="请输入手机号" class="hj-ipt" v-model="user.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input type="password" placeholder="请输入密码" class="hj-ipt" v-model="user.password"></el-input>
                    </el-form-item>
                    <div style="text-align: right;">
                        <router-link style="text-decoration: none;" :to="{path:'/'}">微信扫码登录</router-link>
                    </div>
                    <el-button style="margin-top: 1vh" class="hj-btn" @click="hjSubmite('user')">登录</el-button>
                    <div style="margin-top: 1vh;text-align: center">
                        <router-link style="text-decoration: none;font-size: 12px" :to="{path:'/forget_password'}">忘记密码</router-link>
                    </div>
                </el-form>
            </div>

        </div>
    </div>
</template>
<script>
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../../assets/javascript/validate.js';

    export default {
        name: "login",
        data() {
            var phone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('手机号不能为空'));
                }else{
                    if(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(value)){
                        callback()
                    }else{
                        callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {

                user: {
                    phone: '',
                    password: ''
                },
                rules2: {   // 表单验条件
                    phone:[
                        { required: true,validator: phone, trigger: 'change' }
                    ],
                    password:[
                        { required: true,message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            hjSubmite(formName) {
                // 管理登陆方法.
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userLogin/userLogin', {
                            phone:this.user.phone,
                            passWord:this.user.password,
                        }, msg => {
                            if(msg == null){
                                this._message(3,"手机号或者密码错误!")
                            }else{
                                localStorage.setItem('user',JSON.stringify(msg))
                                localStorage.setItem('uuid',JSON.stringify(msg.user_uuid))
                                this.$router.push({path: '/home'});
                            }



                        })

                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .hj-login {
        width: 100%;
        height: 100%;
        background: url("https://company-webimage.oss-cn-beijing.aliyuncs.com/bg.b4b5636.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
    }

    .hj-login-form {
        background-color: #fff;
        padding: 40px;
        width: 400px;
        height: 400px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*margin-top: -200px;*/
        /*margin-left: -200px;*/
        border-radius: 8px;
        /*-webkit-box-shadow: 6px 3px 3px 6px #adadad;*/
        /*-moz-box-shadow: 6px 3px 3px 6px #adadad;*/
        /*box-shadow: 6px 3px 3px 6px #adadad;*/
    }

    .hj-login-title {
        width: 100%;
        height: 80px;
        background: url('../../assets/images/hj-login.jpg') no-repeat center center;
        background-size: 100% 100%;
        border-radius: 6px;
        margin-bottom: 22px;
        line-height: 80px;
        text-align: center;
        font-size: 26px;
        color: #fff;
    }

    .hj-btn {
        display: block;
        margin: 0 auto;
        width: 120px;
        background-color: #4d4d4d;
        color: #fff;
    }

    .hj-ipt {
        width: 100%;
    }
</style>
