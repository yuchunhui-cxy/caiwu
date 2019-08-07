<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">匹配发票</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <!--<div style="overflow-x: auto;width: 100%;white-space: nowrap;">-->
                        <!--<el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">-->

                            <!--<el-form-item label="摘要：">-->
                                <!--<el-input v-model="form.name" placeholder=""></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="科目：">-->
                                <!--<el-input v-model="form.name" placeholder=""></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="活动时间：">-->
                                <!--<el-col :span="11">-->
                                    <!--<el-input v-model="form.name" placeholder=""></el-input>-->
                                <!--</el-col>-->
                                <!--<el-col style="text-align: center" :span="2">至</el-col>-->
                                <!--<el-col :span="11">-->
                                    <!--<el-input v-model="form.name" placeholder=""></el-input>-->

                                <!--</el-col>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="">-->
                                <!--<el-button type="warning">搜索</el-button>-->

                            <!--</el-form-item>-->
                            <!--<el-form-item label="">-->
                                <!--<el-date-picker-->
                                        <!--style="margin-left: 20px"-->
                                        <!--v-model="yue"-->
                                        <!--type="month"-->
                                        <!--placeholder="选择">-->
                                <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-form>-->

                <!--</div>-->
                <div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                                prop=""
                                label="单选"
                                width="60">
                            <template  slot-scope="scope">
                                <el-radio v-model="id" :label="scope.row.id">&nbsp;</el-radio>
                            </template>
                        </el-table-column>


                                    <el-table-column
                                            prop="company_invoice_type"
                                            label="发票类型"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="invoicing_date"
                                            label="开票日期"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="authentication_date"
                                            label="认证日期"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="company_invoice_number"
                                            label="发票号码"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="company_supplier_name"
                                            label="供应商/客户名称"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="money"
                                            label="金额"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="tax_rate"
                                            label="税率"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="price_tax_total"
                                            label="价税合计"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="invoice_photo"
                                            label="图片"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="company_invoice_code"
                                            label="发票代码"
                                            width="">
                                    </el-table-column>

                    </el-table>


                </div>


            </div>

            <div style="text-align:center;margin-top: 2vh">
                <el-button type="warning" @click="save">保存</el-button>
                <el-button style="margin-left: 3vw" type="info" @click="$router.push({path: '/home/fapiao/tianjiafapiao'})">返回</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        data() {
            return {
                id:'',
                radio: '',
                yue: "",
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:10,
                form:{
                    name:''
                }
            }
        },
        mounted(){
            this.getStorage()
            this._ajax('userAccounts/selectNoInvoice',{
                uuid:this.uuid,
                workAccountId:this.accountId,
            }, msg => {

                this.tableData = msg

                this._message(1,"tableData成功")
            })
        },
        methods: {
            // showRow(row){
            //     this.id = row.id
            // },
            save(){
                if(this.id == ''){
                    this._message(2,"请至少选择一个")
                    return
                }
                if(this.$route.query.from == "liushuiguanli"){
                    this._ajax('userAccounts/updateAccountFlag',{
                        uuid:this.uuid,
                        workAccountId:this.accountId,
                        accountingId:this.$route.query.accountingId,
                        invoiceId:this.id
                    }, msg => {
                        this._message(1,"保存成功")
                        this.$router.push({path: '/home/zhangmian/liushui'})
                    })
                }

                // localStorage.setItem("type1","pingzheng")
                // localStorage.setItem("pingzheng",JSON.stringify(this.id))
                // this.$router.push({path: '/home/fapiao/tianjiafapiao'})
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    if(columnIndex == 1 || columnIndex == 2 || columnIndex == 3){
                        return [0, 0];
                    }
                    return [1, 4];
                }
            },

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
        },
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .has-gutter{
        background: red!important;
    }

</style>