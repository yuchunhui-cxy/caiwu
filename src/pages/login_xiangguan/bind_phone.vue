<template>
    <div class="hj-login">
        <div class="hj-login-form" @keyup.enter="hjSubmite('user')">
            <!--<div class="hj-login-title">团购管理系统V1.0</div>-->
            <div style="font-size: 15px;color: #1C2023;text-align: center">首次登陆请绑定手机号,手机号可作为找回密码的凭证</div>
            <el-form
                    style="margin-top: 2vh"
                ref="user"
                label-width="110px"
                :model="user"
                :rules="rules2">
                <el-form-item label="手机号：+ 86" prop="phone">
                    <el-input type="text" placeholder="请输入手机号" class="hj-ipt" v-model="user.phone"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="code">
                    <el-col :span="12">
                        <el-input type="text" placeholder="请输入验证码" class="hj-ipt" v-model="user.code"></el-input>

                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-button class="hj-ipt" v-show="code" @click="get_code">获取验证码</el-button>
                        <el-button class="hj-ipt" v-show="!code">{{time}}</el-button>
                        <!--<el-button class="hj-ipt" @click="get_code">获取验证码</el-button>-->
                    </el-col>
                </el-form-item>
                <el-form-item label="设置密码：" prop="password">
                    <el-input type="password" placeholder="请输入密码" class="hj-ipt" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="password1">
                    <el-input type="password" placeholder="请再次输入密码" class="hj-ipt" v-model="user.password1"></el-input>
                </el-form-item>
                <el-form-item label="您的姓名：" prop="name">
                    <el-input type="text" placeholder="请输入姓名" class="hj-ipt" v-model="user.name"></el-input>
                </el-form-item>
                <el-button class="hj-btn" @click="hjSubmite('user')">下一步</el-button>
            </el-form>
            <div style="margin-top: 1vh;text-align: center">
                <router-link  style="text-decoration: none;font-size: 10px;color: #008CFF;" :to="{path:'/'}">返回</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../../assets/javascript/validate.js';
    import mix from "@/mixins/mixins"

    export default {
        name: "login",
        mixins:[mix],

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
            var password = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.password1 !== '') {
                        this.$refs.user.validateField('password1');
                    }
                    callback();
                }
            };
            var password1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                time:'60 s',
                code:true,

                user: {
                    phone: '',
                    code: '',
                    password:'',
                    password1:'',
                    name:'',
                },
                rules2: {   // 表单验条件
                    phone:[
                        { required: true,validator: phone, trigger: 'change' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                   password:[
                       { required: true,validator: password, trigger: 'blur' }
                   ],
                    password1:[
                        { required: true,validator: password1, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],

                }
            }
        },
        mounted(){
            this.getStorage()

        },
        methods: {
            get_code(){
                this._ajax('common/sms', {
                    phone:this.user.phone,
                    flag:1,
                    status:3
                }, msg => {
                    this.code=false
                    const t = setInterval(()=>{
                        this.time = parseInt(this.time)-1 + ' s'
                        if(parseInt(this.time) == 1){
                            clearTimeout(t)
                            this.code = true
                        }
                    },1000)

                })
                this.time = '60 s'
            },
            // get_code(){
            //     this._ajax('common/sms', {
            //         phone:this.user.phone,
            //         flag:1,
            //         status:2
            //     }, msg => {
            //         alert(msg)
            //     })
            // },




            hjSubmite(formName) {
                // 管理登陆方法.
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('weChatLogin/add', {
                            uuid:this.uuid,
                            phone:this.user.phone,
                            code:this.user.code,
                            status:3,
                            passWord:this.user.password,
                            passWord1:this.user.password1,
                            name:this.user.name

                        }, data => {
                            this.$router.push({path: '/entry_company_message'});

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

    }

    .hj-login-form {
        background-color: #fff;
        padding: 40px;
        width: 400px;
        height: 400px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
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
