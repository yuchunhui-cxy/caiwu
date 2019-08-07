<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">{{title}}</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <el-form ref="form" :model="form" label-width="110px" :rules="rules">
                    <div style="display: flex;flex-wrap: wrap">
                        <div style="width: 600px;">
                            <el-form-item label="公司名称：" prop="name">
                                <el-input v-model="form.name" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 600px;">
                            <el-form-item label="行业：">
                                <el-select v-model="form.companyIndustry" placeholder="请选择" style="width: 100%;">
                                    <el-option :label="item" :value="item" v-for="item in list" :key="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 600px;">
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
                                <!--<v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected='selected'></v-distpicker>-->
                            </el-form-item>
                        </div>
                        <div style="width: 600px;">
                            <el-form-item label="详细地址：">
                                <el-input v-model="form.companyAddress" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 600px;">
                            <el-form-item label="联系人姓名：">
                                <el-input v-model="form.companyPeople" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 600px;">
                            <el-form-item label="联系人职务：">
                                <el-select v-model="form.job" placeholder="请选择">
                                    <el-option label="上层部门（董事长、总经理、总经理秘书）" value="0"></el-option>
                                    <el-option label="财务部门（财务总监（主管）、会计（总账会计、成本会计、往来会计）、出纳" value="1"></el-option>
                                    <el-option label="人事部门（人事经理（主管）、人事助理（文员）" value="2"></el-option>
                                    <el-option label="其他部门" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 600px;">
                            <el-form-item label="联系人电话：">
                                <el-input v-model="form.phone" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 1200px;">
                            <el-form-item label="备注：">
                                <el-input v-model="form.remarks" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: center;margin-top: 5vh;">
                        <el-button type="warning"  @click="submitForm('form')">保存</el-button>
                        <el-button type="info" style="margin-left: 5vw" @click="$router.go(-1)">取消</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    import mix from "@/mixins/mixins"

    export default {
        components: { VDistpicker },
        name: "xianjinliuliangbiao",
        mixins:[mix],

        data() {
            return {
                shengList:[],
                shiList:[],
                xianList:[],
                sheng:"",
                shi:'',
                xian:"",


                // 行业
                list:[],
                form:{
                    "name": "",
                    "companyIndustry": "",
                    "companyCity": "",
                    "companyAddress": "",
                    "companyPeople": "",
                    "job": "",
                    "phone": "",
                    "remarks": ""
                },
                rules: {
                    name: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    // code: [
                    //     { required: true, message: '请选择活动区域', trigger: 'change' }
                    // ],
                    // city: [
                    //     { required: true, message: '请输入活动名称', trigger: 'change' },
                    // ],
                },
                select: {
                    province: '',
                    city: '',
                    area:''
                },
                title:''
            }
        },
        mounted(){
            this.getStorage()

            // 行业
            this._ajax('weChatLogin/jobList',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.list = msg[0].name.split(',')
                // this._message(1,"行业成功")
            })



            if(this.$route.query.type == "add"){
                this.title = "添加业务伙伴"
                this._ajax('userLogin/province',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                }, msg => {
                    this.shengList = msg
                    // this._message(1,"省成功")
                })
            }else{
                this._ajax('userLogin/province',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                }, msg => {
                    this.shengList = msg
                    // this._message(1,"省成功")

                    // 返显
                    this._ajax('weChatSupplier/getSupplierById',{
                        accountId:this.accountId,
                        uuid:this.uuid,
                        id:this.$route.query.id
                    }, msg => {
                        this.form.name = msg.companySupplierName
                        this.form.companyIndustry = msg.companyIndustry
                        this.form.job = msg.companyPeopleJob
                        this.form.companyAddress = msg.companyAddress
                        this.form.companyPeople = msg.companyPeople
                        this.form.phone = msg.companyPeoplePhone
                        this.form.remarks = msg.companyRemarks
                        const l = msg.companyCity.split(',')
                        this.sheng = l[0]
                        this.shi = l[1]
                        this.xian = l[2]
                        // this._message(1,"返显成功")
                        //找到省的名字相同的那一项
                        const sheng_item = this.shengList.filter(item=>{
                            return item.name == this.sheng
                        })
                        //市
                        this._ajax('userLogin/city',{
                            workAccountId:this.accountId,
                            uuid:this.uuid,
                            id:sheng_item.id
                        }, msg => {
                            this.shiList = msg

                            //找到市的名字相同的那一项
                            const shi_item = this.shiList.filter(item=>{
                                return item.name == this.sheng
                            })
                            //县
                            this._ajax('userLogin/area',{
                                workAccountId:this.accountId,
                                uuid:this.uuid,
                                id:shi_item.id
                            }, msg => {
                                this.xianList = msg
                            })
                        })
                        // this._message(1,"返显成功")
                    })
                })

                this.title = "修改业务伙伴"


            }
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

                        if(this.title == "添加业务伙伴"){
                            this._ajax('weChatSupplier/add',{
                                accountId:this.accountId,
                                uuid:this.uuid,
                                ...this.form
                            }, msg => {
                                this._message(1,"添加成功")
                                this.$router.go(-1)
                            })
                        }else{
                            this._ajax('weChatSupplier/updateSupplierById',{
                                accountId:this.accountId,
                                uuid:this.uuid,
                                ...this.form,
                                id:this.$route.query.id
                            }, msg => {
                                this._message(1,"修改成功")
                                this.$router.go(-1)
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            selected () {
                // this.form.companyCity = (a.province.value) +','+ (a.city.value) +','+ (a.area.value)
                // 处理城市
                this.form.companyCity = this.sheng + ',' + this.shi + ',' + this.xian
            }
        }
    }
</script>

<style>


    .r{
        width: 100%;
        text-align: right;
        margin-top: 3vh;
    }
    .l{
        width: 100%;
        text-align: left;
        margin-top: 3vh;
        margin-left: 1vw;
    }

</style>