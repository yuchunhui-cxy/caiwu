<template>
    <div class="hj-login">
        <div class="hj-login-form" @keyup.enter="hjSubmite('user')">
            <!--<div class="hj-login-title">团购管理系统V1.0</div>-->
            <div style="font-size: 15px;color: #1C2023;text-align: center">首次登陆请绑定手机号,手机号可作为找回密码的凭证</div>
            <el-form
                    style="margin-top: 2vh"
                ref="user"
                label-width="80px"
                :model="user"
                :rules="rules2">
                <el-form-item label="手机号" prop="name">
                    <el-col :span="3">
                        <div>+ 86</div>

                    </el-col>
                    <el-col :span="21">
                        <el-input type="text" placeholder="请输入登录账号" class="hj-ipt" v-model="user.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="验证码" prop="pas">
                    <el-col :span="12">
                        <el-input type="password" placeholder="请输入登录密码" class="hj-ipt" v-model="user.pas"></el-input>

                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-button class="hj-ipt">获取验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="设置密码" prop="pas">
                    <el-input type="password" placeholder="请输入登录密码" class="hj-ipt" v-model="user.pas"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pas">
                    <el-input type="password" placeholder="请输入登录密码" class="hj-ipt" v-model="user.pas"></el-input>
                </el-form-item>
                <el-form-item label="您的姓名" prop="pas">
                    <el-input type="password" placeholder="请输入登录密码" class="hj-ipt" v-model="user.pas"></el-input>
                </el-form-item>
                <el-button class="hj-btn" @click="hjSubmite('user')">下一步</el-button>
            </el-form>
            <div style="margin-top: 1vh;text-align: center;font-size: 10px;color: #008CFF;">返回</div>
        </div>
    </div>
</template>
<script>
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../assets/javascript/validate.js';
    export default {
        name: "login",
        data() {
            return {
                user: {
                    name: '',
                    pas: ''
                },
                rules2: {   // 表单验条件
                    name: [
                        {validator: validateNull, trigger: 'blur'},
                        {validator: validateLength, trigger: 'blur'},
                        {validator: validateSpace, trigger: 'blur'},
                        {validator: validateSpecial, trigger: 'blur'}
                    ],
                    pas: [
                        {validator: validateNull, trigger: 'blur'},
                        {validator: validateLength, trigger: 'blur'},
                        {validator: validateSpace, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            hjSubmite(formName) {
                // 管理登陆方法.
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*this._ajax('user/adminLogin', {
                            account_number: this.user.name,
                            pwd: this.user.pas
                        }, data => {
                            console.log(data)
                            window.sessionStorage.setItem('bear', JSON.stringify(data));
                            this.$router.push({name: 'Home'});
                        })*/
                        this.$router.push({path: '/one'});
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
        background:url("../assets/images/one.png");
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
        background: url('../assets/images/hj-login.jpg') no-repeat center center;
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
