<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">查看发票</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">

                <!--<el-upload :on-change="change" action="" :show-file-list="false" :auto-upload="false">-->
                    <!--<el-button type="warning">点击上传</el-button>-->
                <!--</el-upload>-->

                <div style="border-bottom: 1px solid rgba(96,105,114,0.3);margin: 3vh 0"></div>

                <el-form ref="form" :model="form" label-width="100px">
                    <div style="display: flex;flex-wrap: wrap">
                        <div style="width: 350px;">
                            <el-form-item label="发票类型：" prop="invoiceType">
                                <el-select disabled v-model="form.company_invoice_type" placeholder="请选择" style="width: 100%;">
                                    <el-option label="专票" value="0"></el-option>
                                    <el-option label="普票" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="开票日期：" prop="invoicingDate">
                                <el-date-picker disabled style="width: 100%;" type="date" placeholder="" v-model="form.invoicing_date" value-format="yyyy-MM-dd"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="认证日期：">
                                <el-date-picker disabled style="width: 100%;" type="date" placeholder="" v-model="form.authentication_date" value-format="yyyy-MM-dd"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="发票号码：" prop="invoiceNumber">
                                <el-input disabled v-model="form.company_invoice_number" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>

                        <div style="width: 100%;display: flex;flex-wrap: wrap">
                            <div style="width: 350px;">
                                <el-form-item label="" label-width="10px" prop="supplierType">
                                    <el-select disabled v-model="form.company_supplier_type" placeholder="请选择" style="width: 100%;">
                                        <el-option label="供应商" value="供应商"></el-option>
                                        <el-option label="客户" value="客户"></el-option>
                                    </el-select>

                                </el-form-item>
                            </div>
                            <div style="width: 600px;">
                                <el-form-item label="" label-width="10px" prop="supplierName">
                                    <el-select disabled v-model="form.company_supplier_name" placeholder="请选择" style="width: 100%;">
                                        <el-option v-for="item in list" :key="item.company_supplier_name" :label="item.company_supplier_name" :value="item.company_supplier_name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <!--<div style="margin-left: 20px" v-if="$route.query.from.split('_')[0] == 'fapiaoguanli'">-->
                                <!--<el-button @click="$router.push({path: '/home/gongyingshangkehu/add_set',query:{type:'add'}})" type="" icon="el-icon-plus"></el-button>-->

                            <!--</div>-->
                        </div>




                        <div style="width: 350px;">
                            <el-form-item label="金额：" prop="money">
                                <el-input disabled v-model="form.money" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="税率：" prop="taxRate">
                                <el-input disabled v-model="form.tax_rate" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="价税合计：" prop="priceTaxTotal">
                                <el-input disabled v-model="form.price_tax_total" style="width: 100%;"></el-input>
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
                    <img :src="form.invoice_photo" style="width: 300px;">
                </div>

            </div>

            <div style="display: flex;justify-content: center;margin-top: 2vh">
                <el-button @click="$router.push({path:'/home/fapiao/fapiaoguanli_xiugai',query:{'invoiceId':$route.query.invoiceId}})" type="warning">编辑</el-button>

                <el-button style="margin-left: 10vw" @click="$router.go(-1)" type="info">返回</el-button>

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
        data() {
            return {
                // 第二个请选择
                list:[],
                form:{

                },
            }
        },
        components:{
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
                this._ajax('userAccounts/selectUserInvoiceOne',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId:this.$route.query.invoiceId
                }, msg => {
                    this.form = msg
                    // this._message(1,"业务伙伴成功")

                })

            })
        },
        methods: {

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