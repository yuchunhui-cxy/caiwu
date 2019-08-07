<template>
    <div class="hj-home">
        <!--<div id="zhengzhaoceng" style="width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 100;position: fixed"></div>-->
        <!-- 导航页面Title -->
        <div class="hj-home-title">
            <!--<div style="width: 210px;display: inline-block;height: 60px;text-align: center">-->
                <!--<img src="../assets/images/logo.png" class="header_img">-->


            <!--</div>-->
            <!--<div style="width: 300px;display: inline-block;height: 60px;">-->
                <!--<span class="c-fff m-l-20 f-l" style="font-size: 30px;cursor: default">财务管理系统</span>-->


            <!--</div>-->

            <img src="../assets/images/logo.png" class="header_img">
            <span class="c-fff m-l-20 f-l" style="font-size: 30px;cursor: default">财务管理系统</span>
            <span class="hj-home-btn text_color" @click="$router.push({path:'/home'})">首页</span>
            <span class="hj-home-btn text_color" @click="">手机版</span>
            <span class="hj-home-btn text_color" @click="$router.push({path:'/advertisement'})">财务代理</span>
            <span class="hj-home-btn text_color" @click="help">帮助中心</span>
            <span class="hj-home-btn text_color" @click="pageBack">退出</span>
            <!--<div style="width: 60%;display: inline-block">-->
                <!--<el-menu :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#FFF" active-text-color="#ffd04b" @select="handleSelect">-->

                    <!--<el-menu-item index="1">-->
                        <!--<span style="width: 200px;" @click="$router.push({path:'/home'})">首页</span>-->
                    <!--</el-menu-item>-->
                    <!--<el-menu-item index="2">-->
                        <!--手机版-->
                    <!--</el-menu-item>-->
                    <!--<el-menu-item index="3">-->
                        <!--<span @click="$router.push({path:'/advertisement'})">财务代理</span>-->
                    <!--</el-menu-item>-->
                    <!--<el-menu-item index="4">-->
                        <!--<span @click="help">帮助中心</span>-->

                    <!--</el-menu-item>-->
                    <!--<el-menu-item index="5">-->
                        <!--<span @click="pageBack">退出</span>-->
                    <!--</el-menu-item>-->
                <!--</el-menu>-->

            <!--</div>-->


            <!--<el-button class="f-r hj-home-btn" type="info" round size="mini" @click="dialogVisible=true">修改密码</el-button>-->
            <!--<span class="c-fff f-r f-15">欢迎</span>-->
        </div>

        <el-container class="hj-box">
            <el-aside width="210px" height="300px">
                <!-- 导航页面导航 -->
                <el-menu
                    :collapse-transition="true"
                    :default-active='nowPath'
                    class="hj-home-nav"
                    @open="handleOpen"
                    @close="handleClose"
                    :unique-opened="true"
                    :router="true"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <div style="text-align: center">

                        <img :src="work_head_photo" class="header_img" style="margin-top: 2vh">
                        <div style="color: #FFF;font-size: 10px">
                            <el-dropdown @command="changeCompany">
                                <span class="el-dropdown-link" style="color: #FFF;">
                                    {{company}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  v-for="item in companyList" :key="item.id" :command="item.user_name+'-'+item.id">{{item.user_name}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>

                    </div>

                    <!--<el-submenu index="1">-->
                        <el-menu-item index="/home/zhangmian/index">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">账面</span>
                        </el-menu-item>

                    <!--</el-submenu>-->


                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">管理</span>
                        </template>
                        <el-menu-item index="/home/zhangtao/base_message_manage">
                            <!--<i class="el-icon-more-outline"></i>-->
                            <span slot="title">基本信息管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/fapiao/fapiaoguanli">
                            <span slot="title">发票管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/pingzhengguanli/pingzhengguanli">
                            <span slot="title">凭证管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/gongyingshangkehu/gongyingshang">
                            <span slot="title">供应商/客户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/home/wuxianyijin/wuxianyijin">
                            <span slot="title">员工/五险一金管理</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">账簿</span>
                        </template>
                        <el-menu-item index="/home/zhangbu/xianjinrijizhang">
                            <span slot="title">现金日记账</span>
                        </el-menu-item>
                        <el-menu-item index="/home/zhangbu/yinhangrijizhang">
                            <span slot="title">银行日记账</span>
                        </el-menu-item>
                        <el-menu-item index="/home/zhangbu/zongzhang">
                            <span slot="title">总账</span>
                        </el-menu-item>
                        <el-menu-item index="/home/zhangbu/mingxizhang">
                            <span slot="title">明细账</span>
                        </el-menu-item>
                        <el-menu-item index="/home/zhangbu/kemuyuebiao">
                            <span slot="title">科目余额表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 5-20订单管理 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-warning"></i>
                            <span slot="title">报表</span>
                        </template>
                        <el-menu-item index="/home/baobiao/zichanfuzhaibiao">
                            <span slot="title">资产负债表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/baobiao/lirunbiao">
                            <span slot="title">利润表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/baobiao/xianjinliuliangbiao">
                            <span slot="title">现金流量表</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item index="/advertisement">
                        <i class="el-icon-more-outline"></i>
                        <span slot="title">其他服务</span>
                    </el-menu-item>

                    <!--<div style="width: 100%;height: 100px;background: blue">-->

                    <!--</div>-->

                    <div style="width: 100%;height: 100px;background: #545c64;display: flex;justify-content: center;padding-top: 2vh">
                        <img @click="appeal" src="../assets/images/appeal.png" style="width: 30px;height: 30px;">

                        <img @click="setUp" src="../assets/images/setUp.png"  style="width: 30px;height:30px;margin-left: 1vw">

                    </div>



                </el-menu>

            </el-aside>

            <el-main>
                <!--<el-breadcrumb separator="/">-->
                    <!--<el-breadcrumb-item v-for="(item,index) in mianbaoxieList" :key="index" v-if="mianbaoxieList.length != 0">-->
                        <!--{{item}}-->
                        <!--&lt;!&ndash; 不可以点的 &ndash;&gt;-->
                        <!--&lt;!&ndash;<span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>&ndash;&gt;-->
                        <!--&lt;!&ndash; 可以点击 &ndash;&gt;-->
                        <!--&lt;!&ndash;<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>&ndash;&gt;-->
                    <!--</el-breadcrumb-item>-->
                <!--</el-breadcrumb>-->

                <router-view v-if="isRouterAlive"></router-view>
            </el-main>

        </el-container>

        <!-- 修改密码弹窗 -->
        <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleCloseX">
            <div v-if="dialogVisible">
                <el-form label-width="100px" size="mini" style="width: 70%;margin: 0 auto;" ref="xgForm" :model="xgForm"
                         :rules="rules2">
                    <el-form-item label="新密码" prop="nPass">
                        <el-input v-model="xgForm.nPass" placeholder="请输入新密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码" prop="aPass">
                        <el-input v-model="xgForm.aPass" placeholder="请输入确认密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="changePassword('xgForm')">确定</el-button>
                        <el-button size="mini" @click="cancel('xgForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- 修改密码弹窗 结束 -->

    </div>
</template>

<script>

    import mixin from '../mixins/mixins'
    import {validateNull, validateLength, validateSpace, validateSpecial} from '../assets/javascript/validate.js'

    export default {
        name: "",
        provide () {
            return {
                reload: this.reload,
                shuaxin_company:this.shuaxin_company,
            }
        },

        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.xgForm.nPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                mianbaoxieList:[],

                activeIndex: '1',

                work_head_photo:'',

                isRouterAlive: true,

                company:'您还没选择公司',
                companyList:[],
                // bear: JSON.parse(sessionStorage.getItem("bear")),
                nowPath: "",
                dialogVisible: false,
                xgForm: {
                    nPass: '',
                    aPass: ''
                },
                rules2: {   // 表单验条件
                    nPass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],
                    aPass: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ]
                },
            }
        },
        watch: {
            $route() {
                // const matched = this.$route.matched.map(item => item.meta.title);
                // if(matched.length == 2){
                //     const l = matched[1].split("/")
                //     matched.pop()
                //     matched.push(...l)
                //     this.mianbaoxieList = matched
                // }

            }
        },
        filters: {
            //后台身份
            filterT: function (arg) {
                if (arg == 1) {
                    return "管理员"
                } else if (arg == 2) {
                    return "客服"
                } else if (arg == 3) {
                    return "审核员"
                } else if (arg == 4) {
                    return "复审员"
                }
            },
        },

        created() {
            // const matched = this.$route.matched.map(item => item.meta.title);
            // console.log(matched)
            // if(matched.length == 2){
            //     const l = matched[1].split("/")
            //     matched.pop()
            //     matched.push(...l)
            //     this.mianbaoxieList = matched
            // }



            this.getStorage()
            //在页面刷新时导航正确指向;
            this.nowPath = this.$route.path;
            this.shuaxin_company()




        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            },
            shuaxin_company(){
                // 加载自己有哪些公司
                this._ajax('userCompany/selectUserCompany', {
                    uuid: this.uuid,
                }, msg => {
                    this.companyList = msg

                    // 如果删除了公司缓存,默认显示第一个
                    if(!localStorage.getItem("workAccountId") && localStorage.getItem("uuid")){

                        this.company = msg[0].user_name
                        this.work_head_photo = msg[0].work_head_photo
                        localStorage.setItem("workAccountId",JSON.stringify(msg[0].id))

                    }else if(localStorage.getItem("workAccountId") && localStorage.getItem("uuid")){
                        const a = msg.filter(item=>{
                            return item.id == JSON.parse(localStorage.getItem("workAccountId"))
                        })
                        this.company = a[0].user_name
                        this.work_head_photo = a[0].work_head_photo
                    }


                })
            },
            reload () {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            },

            changeCompany(data){
                if(typeof data == "object"){
                    return
                }
                this.company = data.split('-')[0]
                // sessionStorage.setItem("company")
                localStorage.setItem("workAccountId",data.split("-")[1])
                this.reload()
                this.shuaxin_company()
            },
            appeal(){
                // this.$router.push({path: '/one'})
            },
            setUp(){
                this.$router.push({path: '/home/setUp/setUp'})
            },
            help(){
                this.$router.push({path: '/help'})

            },




            handleCloseX() {
                this.xgForm.oPass = this.xgForm.nPass = this.xgForm.aPass = "";
                this.dialogVisible = false;
            },
            changePassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.xgForm)
                        if (this.xgForm.nPass !== this.xgForm.aPass) {
                            this._message(2, '两次输入密码不一致!')
                        }
                        this.$router.push({path: 'hrhLogin'})
                        /*this._ajax('user/updateAdmin', {
                            adminId: this.bear.id,
                            pwd: this.xgForm.nPass
                        }, msg => {
                            this._message(1, '密码修改成功!')
                            this.dialogVisible = false;
                            this.$refs[formName].resetFields();
                            window.sessionStorage.clear();
                            this.$router.push({name: 'hrhLogin'})
                        })*/
                    } else {
                        // this._message(2, '请完善表单后提交!')
                        return false;
                    }
                });
            },
            cancel(formName) {
                this.dialogVisible = false;
                this.$refs[formName].resetFields();
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            pageBack() {
                this.$confirm('确定要退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    window.localStorage.removeItem("user")
                    window.localStorage.removeItem("uuid")
                    window.localStorage.removeItem("workAccountId")

                    this.$router.push({path: '/'})
                }).catch(() => {
                    this.activeIndex = 1
                    this.$message({
                        type: 'info',
                        message: '取消退出'
                    });
                });
            }
        },
        mixins: [mixin]
    }
</script>

<style scoped>
    .el-main{
        background:#F8F8FF;
    }


    .hj-home {
        width: 100%;
        height: 100%;
    }

    .hj-home-title {
        width: 100%;
        height: 60px;
        background-color: #545c64;
        line-height: 60px;
    }

    .hj-home-title > img {
        display: block;
        float: left;
        margin-top: 2.5px;
        margin-left: 48px;
    }

    .hj-home-btn {
        margin-top: 16px;
        margin-right: 14px;
        cursor:pointer;
    }

    .hj-home-nav {
        height: 100%;
    }

    .hj-box {
        width: 100%;
        height: 100%;
    }

    .hj-main {
        background-color: #fafafa;
    }

    .header_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .el-aside::-webkit-scrollbar { /*滚动条整体样式*/
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .el-aside::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }

    .el-aside::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        background: #EDEDED;
    }

    .f-15 {
        font-size: 15px;
    }
    .text_color{
        color: #FFF;
        margin: 3vw;
    }
</style>
