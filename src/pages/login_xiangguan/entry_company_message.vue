<template>
    <div class="hj-login">
        <div class="hj-login-form" @keyup.enter="hjSubmite('user')">
            <div style="font-size: 30px;color: #1C2023;text-align: center">录入公司信息</div>
            <div style="border-bottom: 1px solid #D6DFE8;margin: 2vh"></div>
            <el-form
                    :rules="rules"
                    ref="user"
                    label-width="150px"
                    :model="user">
                <div style="display: flex;justify-content: space-between;margin-top: 5vh">
                    <div style="flex: 6;">
                        <!--<el-form-item label="账套名称：">-->
                            <!--<el-input type="text" placeholder="" v-model="user.workAccountName"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="公司名称：" prop="userName">
                            <el-input type="text" placeholder="请输入公司名称" class="hj-ipt" v-model="user.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="所在城市：">
                            <el-col :span="7" >
                                <!--<el-form-item>-->
                                <el-select @change="change_sheng" v-model="sheng" placeholder="请选择省" style="width: 100%;">
                                    <el-option :label="item.name" :value="item" v-for="item in shengList" :key="item.id"></el-option>
                                </el-select>
                                <!--</el-form-item>-->
                            </el-col>
                            <el-col :span="7" :offset="1">
                                <!--<el-form-item>-->
                                <el-select @change="change_shi" v-model="shi" placeholder="请先选择省" style="width: 100%;">
                                    <el-option :label="item.name" :value="item" v-for="item in shiList" :key="item.id"></el-option>
                                </el-select>
                                <!--</el-form-item>-->
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <!--<el-form-item>-->
                                <el-select @change="change_xian" v-model="xian" placeholder="请先选择市" style="width: 100%;">
                                    <el-option :label="item.name" :value="item" v-for="item in xianList" :key="item.id"></el-option>
                                </el-select>
                                <!--</el-form-item>-->
                            </el-col>
                            <!--<v-distpicker style="width: 130%!important;" :province="select.province" :city="select.city" :area="select.area" @selected='selected'></v-distpicker>-->
                        </el-form-item>
                        <el-form-item label="增值税种类：" prop="companyTaxType">
                            <el-radio-group v-model="user.companyTaxType">
                                <el-radio :label="0">小规模纳税人</el-radio>
                                <el-radio :label="1">一般纳税人</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="您的职务：">
                            <el-select v-model="user.job" placeholder="请选择">
                                <el-option label="上层部门（董事长、总经理、总经理秘书）" value="0"></el-option>
                                <el-option label="财务部门（财务总监（主管）、会计（总账会计、成本会计、往来会计）、出纳" value="1"></el-option>
                                <el-option label="人事部门（人事经理（主管）、人事助理（文员）" value="2"></el-option>
                                <el-option label="其他部门" value="3"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="请为本账套命名(可选)：">
                            <el-input type="text" placeholder="默认公司名称" v-model="user.workAccountName"></el-input>
                        </el-form-item>
                        <el-form-item label="账套启用日期：" prop="enableTime">
                            <el-date-picker type="date" placeholder="默认当前日期" v-model="user.enableTime" value-format="yyyy-MM-dd"></el-date-picker>
                            <div style="font-size: 14px;color: #8F97A4;">账套启用年月一旦设定不能更改</div>
                        </el-form-item>
                    </div>
                    <div style="flex: 5;">
                        <el-form-item label="行业：" prop="workType">
                            <el-select v-model="user.workType" placeholder="请选择">
                                <el-option :label="item" :value="item" v-for="(item,index) in list" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="详细地址：" prop="workAddress">
                            <el-input type="text" placeholder="请输入详细地址" v-model="user.workAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="会计准则：" prop="accountingStandards">
                            <el-radio-group v-model="user.accountingStandards">
                                <el-radio :label="0">小企业会计准则</el-radio>
                                <el-radio :label="1">企业会计准则</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="头像：">
                            <el-upload
                                    :auto-upload="false"
                                    class="avatar-uploader"
                                    action="#"
                                    :show-file-list="false"
                                    :on-change="change">
                                <img v-if="user.workHeadPhoto" :src="user.workHeadPhoto" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>
                <div style="text-align: center">
                    <el-button type="warning" style="width: 300px;" @click="hjSubmite('user')">进入财税管家</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import VDistpicker from 'v-distpicker'
    import OSS from 'ali-oss'


    import {validateNull, validateLength, validateSpace, validateSpecial} from '../../assets/javascript/validate.js';
    export default {
        name: "login",
        data() {
            return {
                shengList:[],
                shiList:[],
                xianList:[],
                sheng:"",
                shi:'',
                xian:"",

                list:[],
                user: {
                    workAccountName:'',
                    userName: '',
                    workCity:"",
                    workAddress:"",
                    companyTaxType:"",
                    workType:'',
                    accountingStandards:'',
                    job:'',
                    workAccountNickname:'',
                    enableTime:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + (Number(new Date().getDate()))).slice(-2),
                    aloneAccountFlag:'',
                    workHeadPhoto:''
                },
                rules: {   // 表单验条件
                    userName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    companyTaxType: [
                        { required: true, message: '请选择增值税种类', trigger: 'change' },
                    ],
                    enableTime: [
                        { required: true, message: '请选择账套启用日期', trigger: 'change' },
                    ],
                    workType: [
                        { required: true, message: '请选择行业', trigger: 'change' },
                    ],
                    workAddress: [
                        { required: true, message: '请输入详细地址', trigger: 'blue' },
                    ],
                    accountingStandards: [
                        { required: true, message: '请选择会计准则', trigger: 'change' },
                    ],

                },
                select: {
                    province: '',
                    city: '',
                    area:''
                },
            }
        },
        mounted(){
            this._ajax('weChatLogin/jobList', {

            }, msg => {
                // console.log(msg[0].name)
                this.list = msg[0].name.split(',')
            })
            this._ajax('userLogin/province',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.shengList = msg
                // this._message(1,"省成功")
            })
        },
        methods: {
            change_sheng(obj){
                this.sheng = obj.name
                // 选择第一个时市和县清空
                this.shi = ""
                this.xian = ""
                this._ajax('userLogin/city',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                    id:obj.id
                }, msg => {
                    this.shiList = msg
                })
            },
            change_shi(obj){
                this.shi = obj.name
                // 选择第二个是县清空
                this.xian = ""
                this._ajax('userLogin/area',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                    id:obj.id
                }, msg => {
                    this.xianList = msg
                })
            },
            change_xian(obj){
                this.xian = obj.name
            },

            // 上传文件
            change (file) {
                var _this = this;
                if (file == undefined) {
                    return false;
                }
                var fName = file.name,
                    suffix = fName.substr(fName.lastIndexOf(".")),
                    nda = 'user-herder' + Date.parse(new Date()) / 1000,
                    storeAs = nda + suffix;
                var client = new OSS.Wrapper(this.$ali);
                client.multipartUpload(storeAs, file.raw).then(function (result) {
                    _this.user.workHeadPhoto = result.res.requestUrls[0].split('?')[0];
                    _this.$message({
                        message: '上传成功',
                        type: 'success'
                    });

                }).catch(function (err) {
                    console.log(err);
                    _this.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });

            },
            // // 上传文件
            // change(file){
            //     let me = this
            //     var reader = new FileReader()
            //     reader.readAsDataURL(file.raw);
            //     reader.onload = function () {
            //         me.img = reader.result
            //     }
            // },
            selected () {
                // this.user.workCity = (a.province.value) +','+ (a.city.value) + ','+(a.area.value)
                this.user.workCity = this.sheng + ',' + this.shi + ',' + this.xian

            },
            hjSubmite(formName) {
                // 管理登陆方法.
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.selected()

                        this._ajax('userLogin/addUserCompany', {
                            ...this.user,uuid:JSON.parse(localStorage.getItem('uuid'))
                        }, msg => {
                            localStorage.setItem('workAccountId',JSON.stringify(msg.id))
                            this._message(1,'提交成功')
                            this.$router.push({path: '/home'});

                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        width: 178px;
        height: 178px;
        line-height: 178px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        /*width: 178px;*/
        /*height: 178px;*/
        /*line-height: 178px;*/
        /*text-align: center;*/
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .hj-login {
        width: 100%;
        height: 100%;
        background:url("../../assets/images/bg.jpg");
    }

    .hj-login-form {
        background-color: #fff;
        padding: 1vh 1vw;
        width: 1000px;
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
        width: 400px;
        background-color: #4d4d4d;
        font-size: 30px;
        color: #fff;
    }

    .hj-ipt {
        width: 100%;
    }
</style>
