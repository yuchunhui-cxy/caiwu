<template>
    <div>
        <div style="background: #FFF;padding: 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">匹配流水</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">
                <div style="overflow-x: auto;width: 100%;white-space: nowrap;">
                        <el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">

                            <el-form-item label="描述：">
                                <el-input v-model="form.comment" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="分类：">
                                <el-input v-model="form.classify" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="金额：">
                                <el-col :span="11">
                                    <el-input v-model="form.startMoney" placeholder=""></el-input>
                                </el-col>
                                <el-col style="text-align: center" :span="2">至</el-col>
                                <el-col :span="11">
                                    <el-input v-model="form.endMoney" placeholder=""></el-input>

                                </el-col>
                            </el-form-item>
                            <el-form-item label="">
                                <el-button type="warning" @click="search">搜索</el-button>
                            </el-form-item>
                            <el-form-item label="">
                                <el-date-picker
                                        value-format="yyyy-MM"
                                        style="margin-left: 20px"
                                        v-model="form.timeMonth"
                                        type="month"
                                        placeholder="选择">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>


                </div>
                <div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop=""
                                label="单选"
                                width="60">
                            <template slot-scope="scope">
                                <el-radio v-model="id" :label="scope.row.accountingId">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="creationTime"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="描述">
                        </el-table-column>
                        <el-table-column
                                prop="classify"
                                label="分类">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="金额"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="支付方式"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.pay_money == 0" >银行转账</span>
                                <span v-else-if="scope.row.pay_money == 1">现金支付</span>
                                <span v-else-if="scope.row.pay_money == 2">微信(公司)</span>
                                <span v-else-if="scope.row.pay_money == 3">微信(法人)</span>
                                <span v-else-if="scope.row.pay_money == 4">支付宝(公司)</span>
                                <span v-else-if="scope.row.pay_money == 5">支付宝(法人)</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="certificate_number"
                                label="凭证字号"
                                width="180">
                        </el-table-column>


                    </el-table>
                </div>
                <div style="display: flex;justify-content: flex-end;margin-top: 1vh">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="dangqianye"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>


            </div>

            <div style="text-align:center;margin-top: 2vh">
                <el-button type="warning" @click="save">保存</el-button>
                <el-button v-if="$route.query.from == 'fapiaoguanli'" style="margin-left: 3vw" type="info" @click="$router.push({path:'/home/fapiao/fapiaoguanli'})">返回</el-button>

                <el-button v-if="$route.query.from == 'tianjiafapiao'" style="margin-left: 3vw" type="info" @click="$router.push({path:'/home/pingzhengguanli/xinzengfapiao',query:{'from':'fapiaoguanli'}})">返回</el-button>
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
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:10,
                form:{
                    comment:'',
                    classify:'',
                    startMoney:'',
                    endMoney:'',
                    timeMonth:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2)
                }
            }
        },
        mounted() {
            this.getStorage()
            this.list()
        },
        methods: {
            search(){
                this.dangqianye = 1
                this.list()
            },
            list(){
                this._ajax('userAccounts/selectNoFlowing',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    ...this.form
                }, msg => {
                    this.tableData = msg.PageInfo.list
                    this.total = msg.PageInfo.total
                    // this._message(1,"tableData成功")
                })
            },
            save(){
                if(this.id == ""){
                    this._message(2,"请至少选择一项")
                    return
                }
                // 发票管理来的
                if(this.$route.query.from == "fapiaoguanli"){
                    this._ajax('userAccounts/updateAccountFlag',{
                        uuid:this.uuid,
                        workAccountId:this.accountId,
                        accountingId:this.id,
                        invoiceId:this.$route.query.invoiceId
                    }, msg => {
                        this._message(1,"保存成功")
                        this.$router.push({path:"/home/fapiao/fapiaoguanli"})
                    })
                }
                // 好多按钮那个页来的
                if(this.$route.query.from == "tianjiafapiao"){
                    if(this.id == ''){
                        this._message(2,"请至少选择一个")
                        return
                    }

                    this._ajax('userAccounts/addFlowingWaterInvoice',{
                        uuid:this.uuid,
                        workAccountId:this.accountId,
                        ...JSON.parse(sessionStorage.getItem("tianjiafapiao_data")),
                        type1:2,
                        accountingId:this.id
                    }, msg => {
                        this._message(1,"保存成功")
                        sessionStorage.removeItem('tianjiafapiao_data');
                        this.$router.push({path:"/home/fapiao/fapiaoguanli"})
                    })
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
                this.pageSize = val
                this.list()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye = val
                this.list()
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