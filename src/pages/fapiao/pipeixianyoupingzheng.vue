<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 8vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">匹配凭证</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="overflow-x: auto;width: 100%;white-space: nowrap;">
                        <el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">

                            <el-form-item label="摘要：">
                                <el-input v-model="form.certificateAbstract" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="科目：">
                                <el-input v-model="form.accountantSubject" placeholder=""></el-input>
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
                    <el-table :data="tableData" style="width: 100%" >
                        <el-table-column
                                prop=""
                                label="单选"
                                width="60">
                            <template slot-scope="scope">
                                <el-radio v-model="id" :label="scope.row.id">&nbsp;</el-radio>
                            </template>
                        </el-table-column>


                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table :data="props.row.list" style="width: 100%" :show-summary="true">
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
                                            <!--<el-button type="text" size="small" @click="$router.push({path:'/home/pingzhengguanli/editor_pingzheng',query:{id:scope.row.certificateId,uuid:scope.row.certificate_uuid}})">修改</el-button>-->
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
                                <!--width="250">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button @click="" type="text" size="small" @click="update_invoice(scope.row.id)">上传发票</el-button>-->
                                <!--<el-button type="text" size="small" @click="congxianyoupiaojuxuanze(scope.row.id)">绑定现有发票</el-button>-->
                                <!--&lt;!&ndash;<el-button type="text" size="small" @click="$router.push({path:'/home/pingzhengguanli/editor_pingzheng',query:{id:scope.row.id}})">修改</el-button>&ndash;&gt;-->
                                <!--<el-button type="text" size="small" @click="del_one(scope.row.id)">删除</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
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
                    name:'',
                    timeMonth:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                    startMoney:'',
                    endMoney:'',
                    certificateAbstract:'',
                    accountantSubject:'',

                }
            }
        },
        mounted(){
            this.getStorage()
            this.list()
        },
        methods: {
            search(){
                this.dangqianye = 1
                this.list()
            },
            list(){
                this._ajax('userAccounts/selectNoCertificate',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    ...this.form,
                }, msg => {
                    let x = []
                    msg.PageInfo.list.forEach(item=>{
                        let y = true
                        x.forEach((ite,index)=>{
                            if(x[index].id == item.certificate_uuid){
                                y = false
                                return
                            }
                        })
                        if(y){
                            x.push({id:item.certificate_uuid,list:[]})
                        }
                    })

                    msg.PageInfo.list.forEach(item=>{
                        x.forEach(ite=>{
                            if(item.certificate_uuid == ite.id){
                                ite.list.push(item)
                            }
                        })
                    })

                    x.forEach(item=>{
                        item.time = item.list[0].creationTime
                        item.code = item.list[0].certificate_number
                    })

                    this.tableData = x
                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    this.tableData.sort(compare('code'))
                    this.total = x.length
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
                        invoiceId:this.$route.query.invoiceId,
                        certificateUuid:this.id
                    }, msg => {
                        this._message(1,"保存成功")
                        this.$router.push({path:"/home/fapiao/fapiaoguanli"})

                    })
                }
                // 很多按钮进来的
                if(this.$route.query.from == "tianjiafapiao"){
                    if(this.id == ''){
                        this._message(2,"请至少选择一个")
                        return
                    }

                    this._ajax('userAccounts/addCertificateInvoice',{
                        uuid:this.uuid,
                        workAccountId:this.accountId,
                        ...JSON.parse(sessionStorage.getItem("tianjiafapiao_data")),
                        type1:1,
                        certificateUuid:this.id
                    }, msg => {
                        this._message(1,"保存成功")
                        sessionStorage.removeItem('tianjiafapiao_data');
                        this.$router.push({path:"/home/fapiao/fapiaoguanli"})
                    })
                }

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