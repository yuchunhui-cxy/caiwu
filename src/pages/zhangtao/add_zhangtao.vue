<template>
    <div>
        <div style="background: #FFF;padding: 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">新建账套</div>
            <div style="border: 1px solid #F8F8FF;padding:1vh 2vw;margin-top: 2vh">
                <div>
                    <el-form
                            ref="user"
                            label-width="170px"
                            :model="user"
                            :rules="rules">
                        <div style="display: flex;justify-content: space-between;margin-top: 5vh">
                            <div style="flex: 6;">
                                <!--<div style="margin-bottom: 3vh">-->
                                    <!--<el-button type="info"  @click="$router.push({path:'/home/zhangtao/zhanghushezhi'})">账户设置</el-button>-->
                                    <!--<el-button type="info" @click="$router.push({path:'/home/zhangtao/qichushezhi'})">初期设置</el-button>-->
                                    <!--<el-button type="info" @click="$router.push({path:'/home/zhangtao/kemushezhi'})">科目设置</el-button>-->
                                <!--</div>-->

                                <!--<el-form-item label="账套名称：" prop="work_account_name">-->
                                    <!--<el-input type="text" placeholder="" v-model="user.work_account_name"></el-input>-->
                                <!--</el-form-item>-->

                                <el-form-item label="公司名称：" prop="user_name">
                                    <el-input type="text" placeholder="请输入公司名称" class="hj-ipt" v-model="user.user_name"></el-input>
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
                                <el-form-item label="增值税种类：" prop="company_tax_type">
                                    <el-radio-group v-model="user.company_tax_type">
                                        <el-radio label="0">小规模纳税人</el-radio>
                                        <el-radio label="1">一般纳税人</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <!--<el-form-item label="" prop="">-->
                                    <!--<el-checkbox v-model="user.alone_account_flag">研发费用单独记账</el-checkbox>-->
                                <!--</el-form-item>-->
                                <el-form-item label="您的职务：">
                                    <el-select v-model="user.job" placeholder="请选择">
                                        <el-option label="上层部门（董事长、总经理、总经理秘书）" value="0"></el-option>
                                        <el-option label="财务部门（财务总监（主管）、会计（总账会计、成本会计、往来会计）、出纳" value="1"></el-option>
                                        <el-option label="人事部门（人事经理（主管）、人事助理（文员）" value="2"></el-option>
                                        <el-option label="其他部门" value="3"></el-option>

                                    </el-select>
                                </el-form-item>
                                <el-form-item label="请为本账套命名(可选)：">
                                    <el-input type="text" placeholder="默认公司名称" v-model="user.work_account_name"></el-input>
                                </el-form-item>
                                <el-form-item label="账套启用日期：" prop="enable_time">
                                    <el-date-picker type="date" placeholder="默认当前日期" v-model="user.enable_time" value-format="yyyy-MM-dd"></el-date-picker>
                                    <div style="font-size: 14px;color: #8F97A4;">账套启用年月一旦设定不能更改</div>
                                </el-form-item>
                            </div>
                            <div style="flex: 5;">
                                <!--<div style="margin-bottom: 3vh;text-align: right">-->
                                    <!--<el-button type="info">新建账套</el-button>-->
                                    <!--<el-button type="info" @click="data_init">数据初始化</el-button>-->
                                <!--</div>-->
                                <el-form-item label="行业：" prop="work_type">
                                    <el-select v-model="user.work_type" placeholder="请选择">
                                        <el-option :label="item" :value="item" v-for="(item,index) in list" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="详细地址：" prop="work_address">
                                    <el-input type="text" placeholder="请输入详细地址" v-model="user.work_address"></el-input>
                                </el-form-item>
                                <el-form-item label="会计准则：" prop="accounting_standards">
                                    <el-radio-group v-model="user.accounting_standards">
                                        <el-radio label="0">小企业会计准则</el-radio>
                                        <el-radio label="1">企业会计准则</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="头像：">
                                    <el-upload
                                            :auto-upload="false"
                                            class="avatar-uploader"
                                            action="#"
                                            :show-file-list="false"
                                            :on-change="change">
                                        <img v-if="user.work_head_photo" :src="user.work_head_photo" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>


                            </div>
                        </div>
                        <div style="display: flex;justify-content: center">
                            <el-form-item>
                                <el-button type="warning" @click="submitForm('user')">保存</el-button>
                            </el-form-item>

                        </div>

                    </el-form>

                </div>


            </div>

        </div>

    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    import OSS from 'ali-oss'


    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        inject:['shuaxin_company'],


        data() {
            return {
                shengList:[],
                shiList:[],
                xianList:[],
                sheng:"",
                shi:'',
                xian:"",


                list:[],
                img:'',
                user: {
                    user_name:'',
                    work_city: '',
                    work_address: '',
                    company_tax_type:"",
                    work_type:"",
                    accounting_standards:"",
                    work_head_photo:'',
                    job:'',
                    work_account_name:'',
                    work_account_nickname:'',
                    enable_time:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date().getDate()).slice(-2),
                    alone_account_flag:'',
                    creationTime:'',
                    flag1:'',
                    flag2:'',
                },
                rules: {   // 表单验条件
                    // work_account_name:[
                    //     { required: true, message: '请输入账套名称', trigger: 'blur' },
                    // ],
                    user_name: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    company_tax_type: [
                        { required: true, message: '请选择增值税种类', trigger: 'change' },
                    ],
                    enable_time: [
                        { required: true, message: '请选择账套启用日期', trigger: 'change' },
                    ],
                    work_type: [
                        { required: true, message: '请选择行业', trigger: 'change' },
                    ],
                    work_address: [
                        { required: true, message: '请输入详细地址', trigger: 'blue' },
                    ],
                    accounting_standards: [
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

            this.getStorage()

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

            // this._ajax('userCompany/selectAccountCompany', {
            //     uuid:this.uuid,id:this.accountId
            // }, msg => {
            //     this.user = msg
            //     const l = msg.work_city.split(',')
            //     this.select.province = l[0]
            //     this.select.city = l[1]
            //     this.select.area = l[2]
            //
            //     // this.user.alone_account_flag = true
            //
            // })
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

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.selected()

                        this._ajax('userLogin/addUserCompany', {
                            uuid:this.uuid,
                            accountId:this.accountId,

                            userName:this.user.user_name,
                            workCity:this.user.work_city,
                            workAddress:this.user.work_address,
                            companyTaxType:this.user.company_tax_type,
                            accountingStandards:this.user.accounting_standards,
                            workHeadPhoto:this.user.work_head_photo,
                            job:this.user.job,
                            workAccountName:this.user.work_account_name,
                            accountNickName:this.user.work_account_nickname,
                            workType:this.user.work_type,
                            enableTime:this.user.enable_time


                        }, msg => {
                            this._message(1,"修改成功")
                            this.shuaxin_company()
                            this.$router.push("/home/zhangtao/base_message_manage")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 上传文件
            change(file){
                // let me = this
                // var reader = new FileReader()
                // reader.readAsDataURL(file.raw);
                // reader.onload = function () {
                //     me.img = reader.result
                // }
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
                    _this.user.work_head_photo = result.res.requestUrls[0].split('?')[0];
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
            selected () {
                // this.user.work_city = (a.province.value) + ','+ (a.city.value) + ',' + (a.area.value)
                this.user.work_city = this.sheng + ',' + this.shi + ',' + this.xian


            },
            // arraySpanMethod({row, column, rowIndex, columnIndex}) {
            //     if (rowIndex === 0) {
            //         if(columnIndex == 1 || columnIndex == 2 || columnIndex == 3){
            //             return [0, 0];
            //         }
            //         return [1, 4];
            //     }
            // },

            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 != 0) {
                    return 'lan';
                }
                return "";
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.multi = val;
                console.log(this.multi)
            },
            handleClick(row) {
                console.log(row);
                this.$router.push({path:"/home/fapiao/fapiaoguanli_xiugai"})

            },
            delClick(row){
                console.log(row)
            },
            // 添加人员
            add(){
                // this.$router.push({path:"/home/manage/add_set"})
            },
            // 五险一金设置
            set(){
                this.$router.push({path:"/home/manage/set"})

            },
            // 编辑
            editor(){
                // this.$router.push({path:"/home/manage/add_set"})
            }
        },
    }
</script>

<style>
    .avatar-uploader .el-upload{
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

    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .has-gutter{
        background: red!important;
    }

</style>