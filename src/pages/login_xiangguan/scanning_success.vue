<template>
    <div class="hj-login">
        <div class="hj-login-form" @keyup.enter="hjSubmite('user')">
            <div style="display: flex;justify-content: center;align-items: center;height: 80%;">
                <div @click="next">
                    <div style="font-size: 30px;color: #1C2023;text-align: center">
                        扫描成功！
                    </div>
                    <div style="font-size: 30px;color: #1C2023;">
                        在微信上点击确定即可登录
                    </div>
                </div>
            </div>

            <div style="text-align: right">
                <router-link style="text-decoration: none" :to="{path:'/'}">返回</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../../assets/javascript/validate.js';
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
            next(){
                this.$router.push({path: '/bind_phone'});

            },
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
        background:url("../../assets/images/one.png");
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
