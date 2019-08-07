<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">发票管理</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="">



                        <el-form label-width="70px" :inline="true" :model="form" style="display: flex;flex-wrap: wrap">
                            <div class="right">
                                <el-button type="warning" @click="$router.push({path: '/home/pingzhengguanli/xinzengfapiao',query:{'from':'fapiaoguanli','no_show_storage':1}})">上传发票</el-button>
                            </div>
                            <div class="right">
                                <el-button type="warning" @click="del_many">删除</el-button>
                            </div>
                            <div class="right">
                                <el-button type="warning" @click="exportFunc('id','发票报表')">导出</el-button>
                            </div>
                            <div class="right">
                                <el-form-item label="方向">
                                    <el-select v-model="form.type" placeholder="请选择" clearable >
                                        <el-option label="收" value="客户"></el-option>
                                        <el-option label="支" value="供应商"></el-option>
                                        <!--<el-option label="全部" value="quanbu"></el-option>-->
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-form-item label="发票号码">
                                    <el-input v-model="form.invoiceNumber" placeholder=""></el-input>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-form-item label="客户名" label-width="60px">
                                    <el-select filterable v-model="form.supplierName" placeholder="请选择" style="" clearable>
                                        <el-option v-for="item in kehuming" :key="item.company_supplier_name" :label="item.company_supplier_name" :value="item.company_supplier_name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-date-picker
                                        style="width: 230px;"
                                        @change="change_date"
                                        v-model="form.date"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <div class="right">
                                <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>

                            </div>
                        </el-form>



                </div>
                <div id="id">
                    <el-table
                            @selection-change="handleSelectionChange"
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="发票类型"
                                width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.company_invoice_type==0">专票</span>
                                <span v-else-if="scope.row.company_invoice_type==1">普票</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120"
                                prop="invoicing_date"
                                label="开票日期">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                prop="authentication_date"
                                label="认证日期">
                            <template slot-scope="scope">

                                <span v-if="scope.row.company_invoice_type==1">{{scope.row.authentication_date}}</span>
                                <span v-else>
                                    <a href="#" style="text-decoration: none" v-if="scope.row.authentication_date == null" @click.prevent="renzheng(scope.row.authentication_date,scope.row.invoiceId)">认证</a>
                                    <a href="#" style="text-decoration: none" v-if="scope.row.authentication_date != null" @click.prevent="renzheng(scope.row.authentication_date,scope.row.invoiceId)">{{scope.row.authentication_date}}修改</a>

                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="company_invoice_number"
                                label="发票号码"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="company_supplier_name"
                                label="供应商/客户名称"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="company_supplier_type"
                                label="方向"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                prop="money"
                                label="金额">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                prop="tax_rate"
                                label="税率">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                prop="price_tax_total"
                                label="价税合计">
                        </el-table-column>
                        <el-table-column
                                width="100"
                                prop="invoice_photo"
                                label="图片">
                            <template slot-scope="scope">
                                <span>
                                    <a href="#" style="text-decoration: none" @click.prevent="look(scope.row.invoice_photo)">查看</a>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="130"
                                prop="accountingId"
                                label="关联流水">
                            <template slot-scope="scope">
                                <span v-if="scope.row.accountingId">
                                    已关联
                                    <a href="#" style="text-decoration: none" @click.prevent="jiechu_liushui(scope.row.invoiceId,scope.row.accountingId)">解除关联</a>
                                </span>
                                <span v-else>
                                    <a href="#" style="text-decoration: none" @click.prevent="guanlian_liushui(scope.row.invoiceId)">关联</a>

                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="130"
                                prop="certificateUuid"
                                label="关联凭证">
                            <template slot-scope="scope">
                                <span v-if="scope.row.certificateUuid">
                                    {{scope.row.certificate_number | hao}}
                                    <a href="#" style="text-decoration: none" @click.prevent="jiechu_pingzheng(scope.row.invoiceId,scope.row.certificateUuid)">解除关联</a>
                                </span>
                                <span v-else>
                                    <a href="#" style="text-decoration: none" @click.prevent="shengcheng_pingzheng(scope.row.invoiceId)">生成</a>
                                    <a href="#" style="text-decoration: none" @click.prevent="guanlian_pingzheng(scope.row.invoiceId)">关联</a>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row.invoiceId)" type="text" size="small">修改</el-button>
                                <el-button @click="del_one(scope.row.invoiceId)" type="text" size="small">删除</el-button>
                            </template>
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

        </div>
        <el-dialog title="" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="form">
                <el-form-item label="认证日期">
                    <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="form.renzhengriqi"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="renzhengriqi_ok">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="dialogVisible">
            <img :src="img" alt="" style="width: 100%;">
        </el-dialog>

    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        filters:{
            hao(x){
                return x+" 号"
            }
        },
        data() {
            return {
                // 客户名下拉框
                kehuming:[],
                renzhengriqiId:'',

                img:'',
                dialogVisible:false,
                dialogFormVisible:false,
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:10,
                multi:'',
                form:{
                    supplierName:'',
                    date:'',
                    invoiceNumber:'',
                    type:'',
                    startDay:'',
                    endDay:'',

                    renzhengriqi:'',
                },
            }
        },
        mounted(){
            this.getStorage()
            this.list()
            this._ajax('userAccounts/selectCompanySupplierName',{
                company_supplier_name:'',
                uuid:this.uuid,
                workAccountId:this.accountId,
            }, msg => {
                this.kehuming = msg
                // this._message(1,"业务伙伴成功")
            })
        },
        methods: {
            shengcheng_pingzheng(invoiceId){
                this.$router.push({path:'/home/pingzhengguanli/add_pingzheng',query:{invoiceId,"from":'fapiaoguanli'}})

            },
            change_date(){
                console.log(this.form.date)
                if(this.form.date != null){
                    this.form.startDay = new Date(this.form.date[0]).getFullYear() + '-' + (Array(2).join(0) + (Number(new Date(this.form.date[0]).getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date(this.form.date[0]).getDate()).slice(-2)
                    this.form.endDay = new Date(this.form.date[1]).getFullYear() + '-' + (Array(2).join(0) + (Number(new Date(this.form.date[1]).getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date(this.form.date[1]).getDate()).slice(-2)

                }else{
                    this.form.startDay = ''
                    this.form.endDay = ''
                }

            },
            search(){
                this.dangqianye = 1
                this.list()
            },
            renzhengriqi_ok(){
                this._ajax('userAccounts/updateUserInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    authenticationDate:this.form.renzhengriqi,
                    invoiceId:this.renzhengriqiId
                }, msg => {
                    this._message(1,"认证成功")
                    this.dialogFormVisible = false
                    this.list()
                })
            },
            handleSelectionChange(val) {
                const l = val.map(item=>{
                    return item.invoiceId
                })
                this.multi = l.join(',')
            },
            del(){
                this._ajax('userAccounts/deleteUserInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId:this.multi
                }, msg => {
                    this._message(1,"删除成功")
                    this.list()
                    this.multi = ''
                })
            },
            del_many(){
                if(this.multi == ""){
                    this._message(2,"请至少选择一项")
                    return
                }
                this.del()
            },
            del_one(invoiceId){
                this.multi = invoiceId
                this.del()
            },
            list(){
                this._ajax('userAccounts/selectUserInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    ...this.form
                }, msg => {
                    this.total = msg.PageInfo.total
                    this.tableData = msg.PageInfo.list
                    // this._message(1,"tableData成功")
                })
            },
            jiechu_liushui(invoiceId,id){
                this._ajax('userAccounts/deleteInvoiceFlowing',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    invoiceId,
                    accountingId:id
                }, msg => {
                    this._message(1,"取消关联流水成功")
                    this.list()
                })
            },
            guanlian_liushui(invoiceId){
                this.$router.push({path:'/home/fapiao/pipeixianyouliushui',query:{invoiceId,"from":'fapiaoguanli'}})

            },
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
            guanlian_pingzheng(invoiceId){
                this.$router.push({path:'/home/fapiao/pipeixianyoupingzheng',query:{invoiceId,"from":'fapiaoguanli'}})

            },
            look(data){
                this.img = data
                this.dialogVisible = true
            },
            renzheng(date,invoiceId){
                this.form.renzhengriqi = date
                this.renzhengriqiId = invoiceId
                this.dialogFormVisible = true

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
                this.pageSize = val
                this.list()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye = val
                this.list()
            },

            handleClick(invoiceId) {
                this.$router.push({path:"/home/fapiao/fapiaoguanli_xiugai",query:{invoiceId}})
            },
        }
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .has-gutter{
        background: red!important;
    }
    .right{
        margin-right: 10px;
    }

</style>