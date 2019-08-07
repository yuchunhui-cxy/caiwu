<template>
    <div class="hj-login">
        <div class="hj-login-form" @keyup.enter="hjSubmite('user')" style="display: flex;justify-content: center;align-items: center">
            <div>
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
                            <el-input type="password" placeholder="请输入验证码" class="hj-ipt" v-model="user.code"></el-input>

                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-button class="hj-ipt" v-show="code" @click="get_code">获取验证码</el-button>
                            <el-button class="hj-ipt" v-show="!code">{{time}}</el-button>

                        </el-col>
                    </el-form-item>

                    <el-form-item label="新密码：" prop="new_password">
                        <el-input type="password" placeholder="请输入新密码" class="hj-ipt" v-model="user.newPassWord"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="password1">
                        <el-input type="password" placeholder="请再次输入密码" class="hj-ipt" v-model="user.userPassWord"></el-input>
                    </el-form-item>
                    <el-button class="hj-btn" @click="hjSubmite('user')">确定</el-button>
                </el-form>
                <div style="margin-top: 1vh;text-align: center">
                    <router-link style="text-decoration: none;font-size: 12px" :to="{path:'/password_login'}">取消</router-link>
                </div>
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
            var new_password = (rule, value, callback) => {
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
                } else if (value !== this.user.new_password) {
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
                    newPassWord: '',
                    userPassWord: '',
                    code: '',
                },
                rules2: {   // 表单验条件
                    phone:[
                        { required: true,validator: phone, trigger: 'change' }
                    ],
                    code:[
                        { required: true,message: '请输入验证码', trigger: 'blur' }
                    ],
                    new_password:[
                        { required: true,validator: new_password, trigger: 'blur' }
                    ],
                    password1:[
                        { required: true,validator: password1, trigger: 'blur' }
                    ],

                }
            }
        },
        methods: {
            get_code(){
                this._ajax('common/sms', {
                    phone:this.user.phone,
                    flag:1,
                    status:2
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

            hjSubmite(formName) {
                // 管理登陆方法.
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userLogin/forgetPassWord', {
                            ...this.user,
                            status:2
                        }, msg => {
                            this._message(1,'修改成功')
                            this.$router.push({path: '/password_login'});

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
        width: 100%;
        background-color: #4d4d4d;
        color: #fff;
    }

    .hj-ipt {
        width: 100%;
    }
</style>
