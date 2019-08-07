<template>
    <div>
        <!--从现有发票选择-->
        <el-dialog title="" :visible.sync="dialogVisible1" :close-on-press-escape="false" :close-on-click-modal="false">
            <el-table :data="tableData1" >
                <el-table-column
                        prop=""
                        label="单选"
                        width="60">
                    <template slot-scope="scope">
                        <el-radio v-model="invoiceId" :label="scope.row.id">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="creation_time"
                        label="上传时间"
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
                        prop="price_tax_total"
                        label="价税合计"
                        width="">
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 1vh">
            <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="dangqianye1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total1">
            </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1_ok">确 定</el-button>
             </span>
        </el-dialog>



        <div style="background: #FFF;padding: 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">流水</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="display: flex;justify-content: space-between;align-items: flex-start">
                    <div style="display: flex;">
                        <el-button type="warning" @click="$router.push({path:'/home/jizhang/index'})">记一笔</el-button>
                        <el-button type="warning" @click="$router.push({path:'/home/qimojiezhuan/one',query:{date:$route.query.date}})">期末结转</el-button>
                        <el-date-picker
                                value-format="yyyy-MM"
                                @change="change_date"
                                style="margin-left: 1vw"
                                v-model="form.date"
                                type="month"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div>
                    <el-table
                            @selection-change="handleSelectionChange"
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <!--<el-table-column-->
                                <!--type="selection"-->
                                <!--width="55">-->
                        <!--</el-table-column>-->
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
                                prop="pay_money"
                                label="支付方式"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.pay_money == 0">银行转账</span>
                                <span v-else-if="scope.row.pay_money == 1">现金支付</span>
                                <span v-else-if="scope.row.pay_money == 2">微信(公司)</span>
                                <span v-else-if="scope.row.pay_money == 3">微信(法人)</span>
                                <span v-else-if="scope.row.pay_money == 4">支付宝(公司)</span>
                                <span v-else-if="scope.row.pay_money == 5">支付宝(法人)</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="certificate_number"
                                label="凭证字号">
                            <template slot-scope="scope">
                                <span v-if="scope.row.certificate_number">
                                    {{scope.row.certificate_number}}
                                    <!--<a href="#" style="text-decoration: none" @click.prevent="jiechu_fapiao(scope.row.accountingId,scope.row.invoiceId)">解除关联</a>-->
                                </span>
                                <span v-else>
                                    <a href="#" style="text-decoration: none" @click.prevent="shengcheng_pingzheng(scope.row.accountingId)">生成</a>
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="查看票据"
                                width="150">
                            <template slot-scope="scope">
                                <span v-if="scope.row.invoiceId">
                                    <a href="#" style="text-decoration: none" @click.prevent="$router.push({path:'/home/pingzhengguanli/look_fapiao',query:{invoiceId:scope.row.invoiceId}})">查看</a>
                                    <a href="#" style="text-decoration: none" @click.prevent="jiechu_fapiao(scope.row.accountingId,scope.row.invoiceId)">解除关联</a>
                                </span>
                                <span v-else>

                                    <a href="#" style="text-decoration: none" @click.prevent="congxianyoupiaojuxuanze(scope.row.accountingId)">关联</a>
                                    <a href="#" style="text-decoration: none" @click.prevent="shangchuan_fapiao(scope.row.accountingId)">上传</a>

                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="$router.push({path:'/home/jizhang/index',query:{accountingId:scope.row.accountingId}})" type="text" size="small">编辑</el-button>
                                <el-button @click="del(scope.row.accountingId)" type="text" size="small">删除</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--<div style="display: flex;justify-content: flex-end;margin-top: 1vh">-->
                    <!--<el-pagination-->
                            <!--@size-change="handleSizeChange"-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page="dangqianye"-->
                            <!--:page-sizes="[10, 20, 30, 40]"-->
                            <!--:page-size="100"-->
                            <!--layout="total, sizes, prev, pager, next, jumper"-->
                            <!--:total="total">-->
                    <!--</el-pagination>-->
                <!--</div>-->


            </div>

        </div>
        <el-dialog title="" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="form">
                <el-form-item label="认证日期">
                    <el-date-picker
                            v-model="form.code"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="dialogVisible">
            <img src="../../assets/images/one.png" alt="" style="width: 100%;">
        </el-dialog>




    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        data() {
            return {
                //发票的id
                invoiceId:'',
                // 绑定现有发票保存的流水id对话框确定时使用
                liushuiId:"",
                // 从现有发票选择
                tableData1:[],
                dialogVisible1:false,
                dangqianye1:1,
                pageSize1:10,
                total1:0,


                dialogVisible:false,
                dialogFormVisible:false,
                form: {
                    date:JSON.parse(sessionStorage.getItem("liushui_date")),
                    code:'',
                    name:''
                },
                tableData: [],
                total:100,
                dangqianye:1,
                multi:'',

                swit:''
            }
        },
        mounted(){
            this.getStorage()
            this.list()
        },
        methods: {
            // 从现有票据选择
            congxianyoupiaojuxuanze(accountingId){
                this.liushuiId = accountingId

                this.list_bind()

            },
            list_bind(){
                this._ajax('userAccounts/selectNoInvoice3',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye1,
                    pageSize:this.pageSize1,
                }, msg => {
                    this.tableData1 = msg.PageInfo.list
                    this.total1 = msg.PageInfo.total

                    this.dialogVisible1 = true
                    // this._message(1,"票据成功")
                })
            },
            // 对话框的确定
            dialogVisible1_ok(){
                if(this.invoiceId == ""){
                    this._message(2,"请至少选择一项")
                    return
                }
                this._ajax('userAccounts/updateAccountFlag',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    accountingId:this.liushuiId,
                    invoiceId:this.invoiceId

                }, msg => {
                    this.dialogVisible1 = false


                    this._message(1,"关联成功")
                    this.list()
                })

            },
            handleSizeChange1(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize1 = val
                this.list_bind()
            },
            handleCurrentChange1(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye1 = val
                this.list_bind()
            },


            change_date(){
                this.list()
            },
            list(){
                this._ajax('userAccounts/selectFlowingWater',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    creationTime:this.form.date
                }, msg => {
                    this.tableData = msg
                    // this.total = msg.PageInfo.total
                    // this.tableData = msg.PageInfo.list
                    // this._message(1,"tableData成功")
                })
            },
            jiechu_fapiao(accountingId,invoiceId){
                this._ajax('userAccounts/deleteFlowingInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId,
                    accountingId,
                }, msg => {
                    this._message(1,"取消关联发票成功")
                    this.list()
                })
            },
            shengcheng_pingzheng(accountingId){
                this.$router.push({path:'/home/pingzhengguanli/add_pingzheng',query:{accountingId,"from":'liushuiguanli'}})

            },
            shangchuan_fapiao(accountingId){
                this.$router.push({path:'/home/pingzhengguanli/xinzengfapiao',query:{accountingId,"from":'liushuiguanli'}})

            },
            // guanlian_pingzheng(){
            //
            // },
            jiechu_pingzheng(invoiceId,id){
                this._ajax('userAccounts/deleteInvoiceCrtificate',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId,
                    certificateUuid:id
                }, msg => {
                    this._message(1,"取消关联凭证成功")
                    this.list()
                })
            },
            // guanlian_pingzheng(invoiceId){
            //     this.$router.push({path:'/home/fapiao/pipeixianyoupingzheng',query:{invoiceId,"from":'fapiaoguanli'}})
            //
            // },
            del(accountingId){
                this._ajax('userAccounts/deleteFlowingWater',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    accountingId
                }, msg => {
                    this._message(1,"删除成功")
                    this.list()
                })
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
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .has-gutter{
        background: red!important;
    }

</style>