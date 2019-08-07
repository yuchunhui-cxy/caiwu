<template>
    <div style="display: flex;justify-content: center;align-items: center;height: 100%;">
        <div style="background: #FFF;width: 1000px;height: 80%;">
            <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                <el-tab-pane label="修改密码" name="first">
                    <div style="display: flex;justify-content: center;align-items: center;height: 450px;">

                            <el-form style="width: 500px;" :model="ruleForm" :rules="rules1" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="当前密码" prop="passWord">
                                    <el-input type="password" v-model="ruleForm.passWord" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="userPassWord">
                                    <el-input type="password" v-model="ruleForm.userPassWord" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="confirmPassWord">
                                    <el-input type="password" v-model.number="ruleForm.confirmPassWord"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                                    <el-button @click="$router.push({path:'/home'})">取消</el-button>
                                </el-form-item>
                            </el-form>


                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改手机" name="second">
                    <div style="height: 450px;display: flex;justify-content: center;align-items: center">
                        <el-form style="width: 500px;" :model="Form" status-icon :rules="rules2" ref="Form" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="当前密码" prop="userPassWord">
                                <el-input type="password" v-model="Form.userPassWord" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号 +86" prop="userPhone">
                                <el-input type="text" v-model="Form.userPhone" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="">
                                <el-col :span="13">
                                    <el-form-item prop="">
                                        <el-input v-model.number="ruleForm.userPhone" style="width: 100%;"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="4"	>
                                    <el-form-item prop="">
                                        <el-button class="hj-ipt" v-show="code" @click="get_code">获取验证码</el-button>
                                        <el-button class="hj-ipt" v-show="!code">{{time}}</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm1('Form')">确认</el-button>
                                <el-button @click="$router.push({path:'/home'})">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改微信绑定" name="third">
                    <div v-show="c" style="text-align: center">
                        第一步:验证身份
                    </div>
                    <div v-show="!c" style="text-align: center;">
                        第二步:更换要绑定的微信
                    </div>
                    <div style="height: 450px;display: flex;justify-content: center;align-items: center">

                        <div v-show="c" id="div1" style="z-index: 100;">

                        </div>
                        <div v-show="!c" id="div2" style="z-index: 100;">

                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>


        </div>
    </div>
</template>

<script>
    export default {
        name: "set-up",
        mounted(){
            var obj = new WxLogin({
                id:"div1",    //div的id
                appid: "wx3b976ef54d06d852",
                scope: "snsapi_login",
                redirect_uri:"https%3a%2f%2fshujiecaishui.com%2ffinance_system%2f%23%2fhome%2fsetUp%2fsetUp",     //回调地址
                state: "1",　　　　　　　　　//参数，可带可不带
                style: "",　　　　　　　　　//样式  提供"black"、"white"可选，默认为黑色文字描述
                href: ""                 //自定义样式链接，第三方可根据实际需求覆盖默认样式。
            });
            var obj = new WxLogin({
                id:"div2",    //div的id
                appid: "wx3b976ef54d06d852",
                scope: "snsapi_login",
                redirect_uri:"https%3a%2f%2fshujiecaishui.com%2ffinance_system%2f%23%2fhome%2fsetUp%2fsetUp",     //回调地址
                state: "2",　　　　　　　　　//参数，可带可不带
                style: "",　　　　　　　　　//样式  提供"black"、"white"可选，默认为黑色文字描述
                href: ""                 //自定义样式链接，第三方可根据实际需求覆盖默认样式。
            });
        },
        data() {
            var userPhone = (rule, value, callback) => {
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
                    if (this.ruleForm.userPassWord !== '') {
                        this.$refs.ruleForm.validateField('password1');
                    }
                    callback();
                }
            };
            var password1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.confirmPassWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                code1:!this.$route.query.code? 0 : this.$route.query.code,
                code2:!this.$route.query.code? 0 : this.$route.query.code,
                c:true,
                num:0,
                checked:'',



                time:'60 s',
                code:true,

                activeName: 'first',
                ruleForm: {
                    passWord: '',
                    userPassWord: '',
                    confirmPassWord: ''
                },
                Form: {
                    userPassWord: '',
                    userPhone: '',
                },
                rules1: {   // 表单验条件
                    passWord:[
                        { required: true,message: '请输入当前密码', trigger: 'blur' }
                    ],
                    userPassWord:[
                        { required: true,validator: new_password, trigger: 'blur' }
                    ],
                    confirmPassWord:[
                        { required: true,validator: password1, trigger: 'blur' }
                    ],

                },
                rules2: {   // 表单验条件
                    userPhone:[
                        { required: true,validator: userPhone, trigger: 'change' }
                    ],
                    userPassWord:[
                        { required: true,message: '请输入密码', trigger: 'blur' }
                    ],

                }
            };
        },
        watch:{
            $route(to,from){
                if (this.$route.query.code && this.$route.query.state == 1){

                    this._ajax('weChatWeb/WeChatChangeVerification', {
                        WeChatCode:this.$route.query.code,
                        uuid:JSON.parse(localStorage.getItem('uuid'))
                    }, msg => {
                        this.check = msg.check
                        alert(msg.check)
                        this.c = false
                    })
                }
                if (this.$route.query.code && this.$route.query.state == 2){

                    this._ajax('weChatWeb/WeChatChangeBinding', {
                        WeChatCode:this.$route.query.code,
                        check:this.check,
                        uuid:JSON.parse(localStorage.getItem('uuid'))
                    }, msg => {
                        this._message(1,"换绑成功")
                    })
                }
            }
        },
        methods: {
            get_code(){
                this._ajax('common/sms', {
                    phone:this.Form.userPhone,
                    flag:1,
                    status:'',
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


            handleClick(tab, event) {
                // console.log(tab, event);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userHomePage/updateUserPassWord',{...this.ruleForm,uuid:JSON.parse(localStorage.getItem('uuid'))}, msg => {
                            this._message(1,"修改成功")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm1(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userHomePage/updateUserPhone',{...this.Form,uuid:JSON.parse(localStorage.getItem('uuid'))}, msg => {
                            this._message(1,"修改成功")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .el-tabs__nav-wrap
    .el-tabs__nav-scroll
    .el-tabs__nav {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
</style>