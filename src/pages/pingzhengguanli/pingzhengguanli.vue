<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">凭证管理</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="">
                    <el-form label-width="60px" :model="form" style="display: flex;flex-wrap: wrap">
                            <div class="right">
                                <el-button type="warning" @click="$router.push({path:'/home/pingzhengguanli/add_pingzheng'})">添加凭证</el-button>
                            </div>
                            <div class="right">
                                <el-button type="warning" @click="duanhao">整理断号</el-button>
                            </div>
                            <div class="right">
                                <el-button type="warning" @click="del_many">批量删除</el-button>
                            </div>
                            <div class="right">
                                <el-button type="warning" @click="exportFunc('id','凭证管理报表')">导出</el-button>
                            </div>
                            <div class="right">
                                <el-form-item label="摘要">
                                    <el-input style="width: 100px;" v-model="form.certificateAbstract" placeholder="请输入摘要"></el-input>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-form-item label="科目">
                                    <el-input style="width: 100px;" v-model="form.accountantSubject" placeholder="请输入科目"></el-input>
                                </el-form-item>

                            </div>
                            <div class="right">
                                <el-form-item label="" label-width="0">
                                    <el-date-picker
                                            value-format="yyyy-MM"
                                            v-model="form.creationTime"
                                            type="month"
                                            placeholder="选择月">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-form-item label="金额">
                                    <el-input clearable style="width:100px;" v-model="form.startMoney" placeholder=""></el-input>
                                    <div style="display:inline-block">-</div>
                                    <el-input clearable style="width: 100px;" v-model="form.endMoney" placeholder=""></el-input>
                                </el-form-item>
                            </div>
                            <div class="right">
                                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                            </div>

                        </el-form>
                </div>
                <!--表格-->
                <div id="id">
                    <el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table :data="props.row.list" style="width: 100%" :show-summary="false">
                                    <el-table-column
                                            prop="certificate_abstract"
                                            label="摘要"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="accountant_subject"
                                            label="科目"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="total_debit_money"
                                            label="借方金额"
                                            width="">
                                    </el-table-column>
                                    <el-table-column
                                            prop="total_credit_money"
                                            label="贷方金额"
                                            width="">
                                    </el-table-column>
                                    <!--<el-table-column-->
                                            <!--fixed="right"-->
                                            <!--label="操作"-->
                                            <!--width="250">-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<el-button type="text" size="small" @click="$router.push({path:'/home/pingzhengguanli/editor_pingzheng',query:{id:scope.row.certificateId,certificateUuid:scope.row.certificate_uuid}})">修改</el-button>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="生成时间"
                                prop="time">
                        </el-table-column>
                        <el-table-column
                                label="凭证字号"
                                prop="code">
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--fixed="right"-->
                                <!--label="操作"-->
                                <!--width="300">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button v-if="!scope.row.user_invoice_id" type="text" size="small" @click="update_invoice(scope.row.id)">上传发票</el-button>-->
                                <!--<el-button v-if="!scope.row.user_invoice_id" type="text" size="small" @click="congxianyoupiaojuxuanze(scope.row.id)">绑定现有发票</el-button>-->

                                <!--<span v-if="scope.row.user_invoice_id" style="color: #409EFF">-->
                                    <!--&lt;!&ndash;已绑定发票&ndash;&gt;-->
                                    <!--<el-button type="text" size="small" @click="look_fapiao(scope.row.user_invoice_id)">查看发票</el-button>-->
                                    <!--<el-button type="text" size="small" @click="jiechufapiao(scope.row.id,scope.row.user_invoice_id)">解除绑定</el-button>-->
                                <!--</span>-->

                                <!--<el-button type="text" size="small" @click="$router.push({path:'/home/pingzhengguanli/editor_pingzheng',query:{certificateUuid:scope.row.id}})">修改</el-button>-->
                                <!--<el-button type="text" size="small" @click="del_one(scope.row.id)">删除</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </div>
                <!--分页-->
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

        <!--绑定现有发票的对话框-->
        <el-dialog title="" :visible.sync="dialogVisible" :close-on-press-escape="false" :close-on-click-modal="false">
            <el-table :data="tableData1">
                <el-table-column
                        prop=""
                        label="单选"
                        width="60">
                    <template slot-scope="scope">
                        <el-radio v-model="id" :label="scope.row.id">&nbsp;</el-radio>
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
                        @size-change="handleSizeChange_bind"
                        @current-change="handleCurrentChange_bind"
                        :current-page="page_bind"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize_bind"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total_bind">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible_ok">确 定</el-button>
             </span>
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
                // 点击哪个凭证打开的绑定现有发票
                certificateUuid:'',

                // 绑定现有发票的对话框
                dialogVisible:false,
                // 绑定现有发票的表格
                tableData1:[],
                page_bind:1,
                pageSize_bind:10,
                total_bind:0,
                // 绑定现有发票的id
                id:'',

                // 展示tableData相关
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:10,
                multi:'',
                // 上方的搜索选项
                form:{
                    // 摘要
                    certificateAbstract:'',
                    // 金额
                    startMoney:'',
                    endMoney:'',
                    // 日期
                    creationTime:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                    // 科目
                    accountantSubject:'',
                },
            }
        },
        mounted(){
            this.getStorage()
            this.list()
        },
        methods: {
            // 查看发票
            look_fapiao(invoiceId){
                this.$router.push({path:'/home/pingzhengguanli/look_fapiao',query:{invoiceId}})
            },
            // 解除发票
            jiechufapiao(certificateUuid,invoiceId){
                this._ajax('userAccounts/deleteCrtificateInvoic',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    certificateUuid,
                    invoiceId
                }, msg => {
                    this._message(1,"解除绑定成功")
                    this.list()
                })
            },
            search(){
                this.dangqianye = 1
                this.list()
            },

            // 从现有发票选择
            congxianyoupiaojuxuanze(id){
                this.certificateUuid = id
                this.list_bind()
            },
            list_bind(){

                this._ajax('userAccounts/selectNoInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    // uuid:"a2c3c34d5fae4d2180c1283b92521516",
                    // workAccountId:104,
                    page:this.page_bind,
                    pageSize:this.pageSize_bind
                }, msg => {
                    this.tableData1 = msg.PageInfo.list
                    this.total_bind = msg.PageInfo.total
                    this.dialogVisible = true
                    // this._message(1,"票据成功")
                })
            },
            handleSizeChange_bind(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize_bind = val
                this.list_bind()
            },
            handleCurrentChange_bind(val) {
                console.log(`当前页: ${val}`);
                this.page_bind = val
                this.list_bind()
            },
            // 现有发票对话框的确定键
            dialogVisible_ok(){
                if(this.id == ""){
                    this._message(2,'请选择')
                    return
                }
                this._ajax('userAccounts/updateAccountFlag',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    certificateUuid:this.certificateUuid,
                    invoiceId:this.id,
                }, msg => {
                    this._message(1,"绑定现有发票成功")
                    this.dialogVisible = false
                    this.list()
                    this.id = ""
                })
            },

            // 上传发票
            update_invoice(certificateUuid ){
                this.$router.push({path:'/home/pingzhengguanli/xinzengfapiao',query:{certificateUuid ,'from':'pingzhengguanli'}})
            },

            // 表格的复选框
            handleSelectionChange(val) {
                const l = val.map(item=>{
                    return item.id
                })
                this.multi = l.join(',')
            },
            // 批量删除
            del_many(){
                if(this.multi == ""){
                    this._message(2,"请至少选择一项")
                    return
                }
                this.del()
            },
            // 删除一个
            del_one(certificate_uuid){
                this.multi = certificate_uuid
                this.del()
            },
            // 删除的接口
            del(){
                this._ajax('userAccounts/deleteCertificate',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    certificateUuid:this.multi
                }, msg => {
                    this._message(1,"删除成功")
                    this.list()
                    this.multi = ''
                })
            },
            // 整理断号
            duanhao(){
                if(this.form.creationTime == ""){
                    this._message(2,"请选择整理断号的月份")
                }
                this._ajax('userAccounts/updateCertificateFlag',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    time:this.form.creationTime,
                }, msg => {
                    this._message(1,"整理断号成功")
                    this.list()
                })
            },
            list(){
                this._ajax('userAccounts/selectCertificate',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    ...this.form
                }, msg => {
                    this.total = msg.PageInfo.total

                    // 得到所有父类的凭证
                    const x = []
                    msg.PageInfo.list.forEach(item=>{
                        x.push(item.certificate_uuid)
                    })
                    // 去重
                    const y  = [...new Set(x)]
                    //构建雏形
                    const z = []
                    y.forEach(item=>{
                        z.push({id:item,list:[]})
                    })
                    //塞数据
                    z.forEach(item=>{
                       msg.PageInfo.list.forEach(ite=>{
                           if(item.id == ite.certificate_uuid){
                               item.list.push(ite)
                           }
                       })
                   })

                    z.forEach(item=>{
                        item.time = item.list[0].creationTime
                        item.code = item.list[0].certificate_number
                        item.user_invoice_id = item.list[0].user_invoice_id
                    })

                    this.tableData = z


                    // 从小到大排序
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    this.tableData.sort(compare('code'))

                    console.log(this.tableData)
                    // this._message(1,"tableData成功")
                })
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
            }
        }
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .right{
        margin-right: 10px;
    }

</style>