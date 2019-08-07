<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">添加发票</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">

                <el-upload :on-change="change" action="" :show-file-list="false" :auto-upload="false">
                    <el-button type="warning">点击上传</el-button>
                </el-upload>

                <div style="border-bottom: 1px solid rgba(96,105,114,0.3);margin: 3vh 0"></div>

                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <div style="display: flex;flex-wrap: wrap">
                        <div style="width: 350px;">
                            <el-form-item label="发票类型：" prop="invoiceType">
                                <el-select v-model="form.invoiceType" placeholder="请选择" style="width: 100%;">
                                    <el-option label="专票" value="0"></el-option>
                                    <el-option label="普票" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="开票日期：" prop="invoicingDate">
                                <el-date-picker style="width: 100%;" type="date" placeholder="" v-model="form.invoicingDate" value-format="yyyy-MM-dd"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="认证日期：">
                                <el-date-picker style="width: 100%;" type="date" placeholder="" v-model="form.authenticationDate" value-format="yyyy-MM-dd"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="发票号码：" prop="invoiceNumber">
                                <el-input v-model="form.invoiceNumber" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>

                        <div style="width: 100%;display: flex;flex-wrap: wrap">
                            <div style="width: 350px;">
                                <el-form-item label="" label-width="10px" prop="supplierType">
                                    <el-select v-model="form.supplierType" placeholder="请选择" style="width: 100%;">
                                        <el-option label="供应商" value="供应商"></el-option>
                                        <el-option label="客户" value="客户"></el-option>
                                    </el-select>

                                </el-form-item>
                            </div>
                            <div style="width: 600px;">
                                <el-form-item label="" label-width="10px" prop="supplierName">
                                    <el-select v-model="form.supplierName" placeholder="请选择" style="width: 100%;">
                                        <el-option v-for="item in list" :key="item.company_supplier_name" :label="item.company_supplier_name" :value="item.company_supplier_name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div style="margin-left: 20px" v-if="$route.query.from.split('_')[0] == 'fapiaoguanli'">
                                <el-button @click="add_huoban" type="" icon="el-icon-plus"></el-button>

                            </div>
                        </div>




                        <div style="width: 350px;">
                            <el-form-item label="金额：" prop="money">
                                <el-input v-model="form.money" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="税率：" prop="taxRate">
                                <el-input v-model="form.taxRate" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="价税合计：" prop="priceTaxTotal">
                                <el-input v-model="form.priceTaxTotal" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="元" label-width="30px">
                            </el-form-item>
                        </div>
                    </div>
                </el-form>

                <div style="border-bottom: 1px solid rgba(96,105,114,0.3);"></div>

                <div style="margin: 3vh">
                    <img :src="form.invoicePhoto" style="width: 300px;">
                </div>

                <!--凭证管理他们的保存-->
                <div style="display: flex;justify-content: center;margin-top: 5vh;" v-if="$route.query.from.split('_')[0] == 'pingzhengguanli'">
                    <el-button type="warning"  @click="submitForm_pingzheng('form')">保存</el-button>
                    <el-button type="info" style="margin-left: 5vw" @click="cancel_pingzheng">返回</el-button>
                </div>

                <!--流水管理他们的保存-->
                <div style="display: flex;justify-content: center;margin-top: 5vh;" v-if="$route.query.from.split('_')[0] == 'liushuiguanli'">
                    <el-button type="warning"  @click="submitForm_liushui('form')">保存</el-button>
                    <el-button type="info" style="margin-left: 5vw" @click="$router.go(-1)">返回</el-button>
                </div>

                <!--发票管理他们的保存-->
                <div style="" v-if="$route.query.from.split('_')[0] == 'fapiaoguanli'">
                    <el-button type="warning"  @click="tianjiapingzheng('form',0)">生成凭证</el-button>
                    <el-button type="warning"  @click="tianjiapingzheng('form',1)">生成凭证和流水</el-button>
                    <el-button type="warning"  @click="pipeixianyoupingzheng('form')">匹配至现有凭证</el-button>
                    <el-button type="warning"  @click="pipeixianyouliushui('form')">匹配至现有流水</el-button>
                </div>
                <div style="margin-top: 3vh" v-if="$route.query.from.split('_')[0] == 'fapiaoguanli'">
                    <el-button type="warning"  @click="submitForm_fapiaoguanli('form')">仅保存</el-button>
                    <!--<el-button type="warning"  @click="submitForm2('form')">保存</el-button>-->
                    <el-button type="info" style="" @click="$router.push({path:'/home/fapiao/fapiaoguanli'})">取消</el-button>
                </div>
            </div>
            <addHuoBan v-if="show_huoban" @add_huoban_ok = "add_huoban_ok"></addHuoBan>

        </div>


    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    import OSS from 'ali-oss'
    import addHuoBan from "@/components/yuchunhui/add_yewuhuoban"

    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        data() {
            return {
                show_huoban:false,
                // 先赋值给这个再赋值给form的这个
                invoicePhoto1:"",
                // 第二个请选择
                list:[],
                form:{
                    // 发票类型
                    invoiceType:'',
                    // 开票日期
                    invoicingDate:'',
                    // 认证日期
                    authenticationDate:'',
                    // 发票号码
                    invoiceNumber:'',
                    // 供应商或客户
                    supplierType:"",
                    // 供应商或客户的名字
                    supplierName:'',
                    // 金额
                    money:'',
                    // 税率
                    taxRate:'',
                    // 价税合计
                    priceTaxTotal:'',
                    // 图片
                    invoicePhoto:""
                },
                rules: {
                    invoiceType: [
                        { required: true, message: '请选择发票类型', trigger: 'change' },
                    ],
                    invoicingDate: [
                        { required: true, message: '请选择开票日期', trigger: 'change' }
                    ],
                    invoiceNumber:[
                        { required: true, message: '请输入发票号码', trigger: 'blur' }
                    ],
                    supplierType:[
                        { required: true, message: '请选择供应商或客户', trigger: 'change' }
                    ],
                    supplierName:[
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    supplierType:[
                        { required: true, message: '请选择供应商或客户', trigger: 'change' }
                    ],
                    money:[
                        { required: true, message: '请输入金额', trigger: 'blur' }
                    ],
                    taxRate:[
                        { required: true, message: '请输入税率', trigger: 'blur' }
                    ],
                    priceTaxTotal:[
                        { required: true, message: '请选择价税合计', trigger: 'blur' }
                    ],
                },
            }
        },
        components:{
            addHuoBan
        },
        mounted(){
            this.getStorage()
            this._ajax('userAccounts/selectCompanySupplierName',{
                company_supplier_name:'',
                uuid:this.uuid,
                workAccountId:this.accountId,
            }, msg => {
                this.list = msg
                // this._message(1,"业务伙伴成功")
                // 如果缓存里有发票信息显示但是从左边列表点进来就不显示有的话再删除
                if(this.$route.query.from == 'fapiaoguanli' && !this.$route.query.no_show_storage){
                    if(sessionStorage.getItem('tianjiafapiao_data')){
                        this.form = JSON.parse(sessionStorage.getItem("tianjiafapiao_data"))
                    }
                }
                if(this.$route.query.from == 'fapiaoguanli' && this.$route.query.no_show_storage){
                    if(sessionStorage.getItem('tianjiafapiao_data')){
                        sessionStorage.removeItem("tianjiafapiao_data")
                    }
                }
            })
        },
        methods: {
            add_huoban_ok(){
                this._ajax('userAccounts/selectCompanySupplierName',{
                    company_supplier_name:'',
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                }, msg => {
                    this.list = msg
                    this.show_huoban = false
                })
            },
            add_huoban(){
                this.show_huoban = true
                // this.$router.push({path: '/home/gongyingshangkehu/add_set',query:{type:'add'}})
            },
            // 凭证管理进来的保存
            submitForm_pingzheng(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 凭证管理-修改
                        if(this.$route.query.from == "pingzhengguanli_xiugai"){
                            sessionStorage.setItem("fapiao",JSON.stringify(this.form))
                            sessionStorage.setItem("type1","shangchuan_fapiao")
                            this.$router.push({path:"/home/pingzhengguanli/editor_pingzheng",query:{certificateUuid:this.$route.query.certificateUuid}})
                        }
                        //凭证管理
                        if(this.$route.query.from == 'pingzhengguanli'){
                            this._ajax('userAccounts/addCertificateInvoice',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                type1:1,
                                ...this.form,
                                certificateUuid:this.$route.query.certificateUuid
                            }, msg => {
                                this._message(1,"保存成功")
                                this.$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})
                            })
                        }
                        // 凭证管理-添加凭证
                        if(this.$route.query.from == "pingzhengguanli_tianjiapingzheng"){
                            sessionStorage.setItem("fapiao",JSON.stringify(this.form))
                            sessionStorage.setItem("type1","shangchuan_fapiao")
                            this.$router.push("/home/pingzhengguanli/add_pingzheng")
                        }

                        // 如果是记账过来的(???)
                        if(this.$route.query.type == "jizhang_add"){
                            localStorage.setItem("fapiao",JSON.stringify(this.form))
                            localStorage.setItem("type1",0)
                        }
                        // this.$router.push({path: '/home/pingzhengguanli/add_pingzheng'})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel_pingzheng(){
                // 添加凭证进来的返回
                if(this.$route.query.from == "pingzhengguanli_tianjiapingzheng"){
                    this.$router.push("/home/pingzhengguanli/add_pingzheng")
                }
                // 凭证管理进来的
                if(this.$route.query.from == "pingzhengguanli"){
                    this.$router.push("/home/pingzhengguanli/pingzhengguanli")
                }
                // 凭证管理的修改进来的
                if(this.$route.query.from == "pingzhengguanli_xiugai"){
                    this.$router.push({path:"/home/pingzhengguanli/editor_pingzheng",query:{certificateUuid:this.$route.query.certificateUuid}})
                }
            },

            // 发票管理的保存
            // submitForm2(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             // 如果只保存发票
            //             if(!localStorage.getItem("liushui_pingzheng") &&!localStorage.getItem("pipei_liushui") && !localStorage.getItem("pipei_pingzheng")){
            //                 this._ajax('userAccounts/addUserInvoice',{
            //                     uuid:this.uuid,
            //                     workAccountId:this.accountId,
            //                     ...this.form
            //                 }, msg => {
            //                     this._message(1,"仅保存发票成功")
            //                     this.$router.push({path:"/home/fapiao/fapiaoguanli"})
            //                     localStorage.removeItem('tianjiafapiao_data');
            //
            //                 })
            //             }
            //             // 如果匹配现有流水
            //             if(localStorage.getItem("pipei_liushui") && !localStorage.getItem("pipei_pingzheng")){
            //                 this._ajax('userAccounts/addFlowingWaterInvoice',{
            //                     uuid:this.uuid,
            //                     workAccountId:this.accountId,
            //                     ...this.form,
            //                     type1:2,
            //                     accountingId:JSON.parse(localStorage.getItem("pipei_liushui"))
            //                 }, msg => {
            //                     this._message(1,"保存现有流水成功")
            //                     localStorage.removeItem('pipei_liushui');
            //                     localStorage.removeItem('pipei_tianjiafapiao_data');
            //                     this.$router.push({path:"/home/fapiao/fapiaoguanli"})
            //                     localStorage.removeItem('tianjiafapiao_data');
            //
            //
            //
            //                 })
            //             }
            //             // 如果匹配现有凭证
            //             if(!localStorage.getItem("pipei_liushui") && localStorage.getItem("pipei_pingzheng")){
            //                 this._ajax('userAccounts/addCertificateInvoice',{
            //                     uuid:this.uuid,
            //                     workAccountId:this.accountId,
            //                     ...this.form,
            //                     type1:1,
            //                     certificateUuid  :JSON.parse(localStorage.getItem("pipei_pingzheng"))
            //                 }, msg => {
            //                     this._message(1,"保存现有凭证成功")
            //                     localStorage.removeItem('pipei_pingzheng');
            //                     localStorage.removeItem('tianjiafapiao_data');
            //                     this.$router.push({path:"/home/fapiao/fapiaoguanli"})
            //
            //
            //                 })
            //             }
            //             // 匹配了现有流水和凭证
            //             if(localStorage.getItem("pipei_liushui") && localStorage.getItem("pipei_pingzheng")){
            //                 this._ajax('userAccounts/addFlowingWaterInvoiceCertificate',{
            //                     uuid:this.uuid,
            //                     workAccountId:this.accountId,
            //                     ...this.form,
            //                     type1:4,
            //                     accountingId:JSON.parse(localStorage.getItem("pipei_liushui")),
            //                     certificateUuid  :JSON.parse(localStorage.getItem("pipei_pingzheng"))
            //                 }, msg => {
            //                     this._message(1,"保存现有流水和现有凭证成功")
            //                     localStorage.removeItem('pipei_pingzheng');
            //                     localStorage.removeItem('pipei_liushui');
            //                     localStorage.removeItem('tianjiafapiao_data');
            //                     this.$router.push({path:"/home/fapiao/fapiaoguanli"})
            //
            //                 })
            //             }
            //             // 如果不是匹配流水或者凭证
            //             if(localStorage.getItem("liushui_pingzheng")){
            //                 if(JSON.parse(localStorage.getItem("liushui_pingzheng")).checked){
            //                     this._ajax('userAccounts/addFlowingWaterInvoiceCertificate',{
            //                         uuid:this.uuid,
            //                         workAccountId:this.accountId,
            //                         ...JSON.parse(localStorage.getItem("liushui_pingzheng")),
            //                         ...this.form,
            //                         type1:0
            //                     }, msg => {
            //                         this._message(1,"保存发票流水凭证成功")
            //                         localStorage.removeItem('liushhui_pingzheng');
            //                         localStorage.removeItem('tianjiafapiao_data');
            //                         this.$router.push({path:"/home/fapiao/fapiaoguanli"})
            //
            //                     })
            //                 }else{
            //                     this._ajax('userAccounts/addCertificateInvoice',{
            //                         uuid:this.uuid,
            //                         workAccountId:this.accountId,
            //                         ...JSON.parse(localStorage.getItem("liushui_pingzheng")),
            //                         ...this.form,
            //                         type1:0
            //                     }, msg => {
            //                         this._message(1,"保存发票凭证成功")
            //                         localStorage.removeItem('liushhui_pingzheng');
            //                         localStorage.removeItem('tianjiafapiao_data');
            //
            //                         this.$router.push({path:"/home/fapiao/fapiaoguanli"})
            //
            //                     })
            //                 }
            //             }
            //
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // 发票管理的仅保存

            // 发票管理的保存
            submitForm_fapiaoguanli(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userAccounts/addUserInvoice',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,
                            ...this.form
                        }, msg => {
                            this._message(1,"仅保存成功")
                            this.$router.push({path:"/home/fapiao/fapiaoguanli"})
                            // localStorage.removeItem('tianjiafapiao_data');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 生成凭证和流水
            tianjiapingzheng(formName,type){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(type == 0){
                            sessionStorage.setItem('tianjiafapiao_data',JSON.stringify(this.form))
                            this.$router.push({path: "/home/fapiao/tianjiapingzheng",query:{checked:"false"}})
                        }else{
                            sessionStorage.setItem('tianjiafapiao_data',JSON.stringify(this.form))
                            this.$router.push({path: "/home/fapiao/tianjiapingzheng",query:{checked:"true"}})
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            pipeixianyoupingzheng(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        sessionStorage.setItem('tianjiafapiao_data',JSON.stringify(this.form))
                        this.$router.push({path: "/home/fapiao/pipeixianyoupingzheng",query:{'from':'tianjiafapiao'}})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            pipeixianyouliushui(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        sessionStorage.setItem('tianjiafapiao_data',JSON.stringify(this.form))
                        this.$router.push({path: "/home/fapiao/pipeixianyouliushui",query:{'from':'tianjiafapiao'}})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },


            // 流水管理的保存
            submitForm_liushui(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 流水管理进来的
                        if(this.$route.query.from == "liushuiguanli"){
                            this._ajax('userAccounts/addFlowingWaterInvoice',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                type1:2,
                                accountingId:this.$route.query.accountingId,
                                ...this.form
                            }, msg => {
                                this._message(1,"保存成功")
                                this.$router.go(-1)
                            })
                        }
                        // 如果是记账过来的
                        // if(this.$route.query.from == "liushuiguanli_jizhang"){
                        //     sessionStorage.setItem("fapiao",JSON.stringify(this.form))
                        //     sessionStorage.setItem("type1","shangchuan_fapiao")
                        //     this.$router.go(-1)
                        // }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 上传文件
            change (file) {
                var a = this.$message({
                    type:"warning",
                    message:'发票识别中请稍后',
                    duration:0
                })
                function blobToDataURL(blob, callback) {
                    var a = new FileReader();
                    a.onload = function (e) { callback(e.target.result); }
                    a.readAsDataURL(blob);
                }
                blobToDataURL(file.raw,  (dataurl)=> {
                    // this.form.invoicePhoto = dataurl
                    this._ajax('common/invoice',{
                        encode:JSON.stringify(dataurl.split(",")[1])
                    }, msg => {
                        a.close()
                        this._message(1,"识别成功")
                        this.form.invoicePhoto = this.invoicePhoto1

                        this.form.invoiceId = msg.kind
                        this.form.invoiceNumber = msg.number
                        this.form.priceTaxTotal = msg.total
                        this.form.money = msg.pretax_amount
                        // 供生成使用
                        this.form.a = msg.tax

                        // 税率
                        this.form.taxRate = (((msg.tax/msg.pretax_amount).toFixed(2))*100)+ '%'

                        let x = ""
                        msg.date.split("").forEach((item,index)=>{
                            if(item == "年" || item == "月" || item =="日"){
                                if(index != (msg.date.split("").length)-1){
                                    x+="-"

                                }

                            }else{
                                x+=item
                            }
                        })
                        this.form.invoicingDate = x
                    })

                });


                var _this = this;
                if (file == undefined) {
                    return false;
                }
                var fName = file.name,
                    suffix = fName.substr(fName.lastIndexOf(".")),
                    nda = 'user-herder' + Date.parse(new Date()) / 1000,
                    storeAs = nda + suffix;
                console.log(file)

                console.log(storeAs)
                var client = new OSS.Wrapper(this.$ali);
                client.multipartUpload(storeAs, file.raw).then(function (result) {
                    console.log(result.res.requestUrls[0])
                    _this.invoicePhoto1 = result.res.requestUrls[0].split('?')[0];
                    // _this.$message({
                    //     message: '上传成功',
                    //     type: 'success'
                    // });

                }).catch(function (err) {
                    console.log(err);
                    _this.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });

            },

        },
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