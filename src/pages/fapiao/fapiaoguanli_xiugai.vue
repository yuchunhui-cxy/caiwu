<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">编辑发票</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
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
                                <el-date-picker style="width: 100%;" type="date" placeholder="" value-format="yyyy-MM-dd" v-model="form.invoicingDate"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="认证日期：">
                                <el-date-picker style="width: 100%;" type="date" placeholder="" value-format="yyyy-MM-dd" v-model="form.authenticationDate"></el-date-picker>

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
                            <div style="margin-left: 20px">
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


                        <!--<div  v-if="liushui" style="width: 400px;">-->
                            <!--<el-form-item label="关联流水：">-->
                                <!--<el-input disabled v-model="form.company_accounting_id" style="width: 100%;"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</div>-->

                        <!--<div>-->
                            <!--<div v-if="liushui" style="width: 100px;">-->
                                <!--<el-form-item label="" label-width="10px">-->
                                    <!--<a href="#" style="text-decoration: none" @click.prevent="quxiao_liushui">取消关联</a>-->
                                <!--</el-form-item>-->
                            <!--</div>-->
                        <!--</div>-->

                        <!--<div v-if="pingzheng" style="width: 400px;">-->
                            <!--<el-form-item  label="关联凭证：">-->
                                <!--<el-input disabled v-model="form.company_certificate_uuid" style="width: 100%;"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</div>-->

                        <!--<div>-->
                            <!--<div v-if="pingzheng" style="width: 100px;">-->
                                <!--<el-form-item label="" label-width="10px">-->
                                    <!--<a href="#" style="text-decoration: none" @click.prevent="quxiao_pingzheng">取消关联</a>-->
                                <!--</el-form-item>-->
                            <!--</div>-->
                        <!--</div>-->

                        <!--<div style="width: 50px;font-size: 16px;color: #008CFF;line-height: 40px">-->
                           <!--查看-->
                        <!--</div>-->
                    </div>

                </el-form>

                <div style="margin: 3vh">
                    <!--<el-upload-->
                            <!--:auto-upload="false"-->
                            <!--class="avatar-uploader"-->
                            <!--action="#"-->
                            <!--:show-file-list="false"-->
                            <!--:on-change="change">-->
                        <img v-if="form.invoicePhoto" :src="form.invoicePhoto" class="avatar">
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                </div>

                <div style="border-bottom: 1px solid rgba(96,105,114,0.3);"></div>

                <div style="margin-top: 3vh">
                    <el-button type="warning"  @click="submitForm('form')">保存</el-button>
                    <el-button type="info" style="" @click="$router.push({path:'/home/fapiao/fapiaoguanli'})">取消</el-button>
                </div>

            </div>
        </div>
        <addHuoBan v-if="show_huoban" @add_huoban_ok = "add_huoban_ok"></addHuoBan>

    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    import OSS from 'ali-oss'
    import addHuoBan from "@/components/yuchunhui/add_yewuhuoban"

    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        inject:['reload'],
        data() {
            return {
                show_huoban:false,


                invoicePhoto1:"",
                // liushui:"",
                // pingzheng:'',

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
                // this._message(1,"供应商客户成功")

                this._ajax('userAccounts/selectUserInvoiceOne',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId:this.$route.query.invoiceId
                }, msg => {
                    this.form.invoiceType = msg.company_invoice_type
                    this.form.invoicingDate = msg.invoicing_date
                    this.form.authenticationDate = msg.authentication_date

                    this.form.invoiceNumber = msg.company_invoice_number
                    this.form.supplierType = msg.company_supplier_type
                    this.form.supplierName = msg.company_supplier_name
                    this.form.money = msg.money
                    this.form.taxRate = msg.tax_rate
                    this.form.priceTaxTotal = msg.price_tax_total
                    this.form.invoicePhoto = msg.invoice_photo

                    // this.liushui = msg.company_accounting_id
                    // this.pingzheng = msg.company_certificate_uuid
                    // this._message(1,"反显成功")
                })
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

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userAccounts/updateUserInvoice',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,
                            ...this.form,
                            invoiceId:this.$route.query.invoiceId
                        }, msg => {
                            this._message(1,"修改成功")
                            this.$router.push({path:"/home/fapiao/fapiaoguanli"})

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            quxiao_liushui(){
                this._ajax('userAccounts/deleteInvoiceFlowing',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId:this.$route.query.invoiceId,
                    accountingId:this.form.company_accounting_id
                }, msg => {
                    this._message(1,"取消关联流水成功")
                    this.liushui = ''
                })
            },
            quxiao_pingzheng(){
                this._ajax('userAccounts/deleteInvoiceCrtificate',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId:this.$route.query.invoiceId,
                    certificateUuid:this.form.company_certificate_uuid
                }, msg => {
                    this._message(1,"取消关联凭证成功")
                    this.pingzheng = ''
                })
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


                        this.form = {
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
                                invoicePhoto:'',

                        }


                        this.form.invoicePhoto = this.invoicePhoto1

                        this.form.invoicePhoto = this.invoicePhoto1

                        this.form.invoiceId = msg.kind
                        this.form.invoiceNumber = msg.number
                        this.form.priceTaxTotal = msg.total
                        this.form.money = msg.pretax_amount

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
                var client = new OSS.Wrapper(this.$ali);
                client.multipartUpload(storeAs, file.raw).then(function (result) {
                    // console.log(result.res.requestUrls[0])
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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }



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