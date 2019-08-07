<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">利润表</div>
            <div style="display: flex;justify-content: flex-end">
                <el-button @click="exportFunc('lirunbiao','利润表')" type="warning">导出</el-button>
                <el-date-picker
                        @change ="change_date"
                        value-format="yyyy-MM"
                        style="margin-left: 20px"
                        v-model="date"
                        type="month"
                        placeholder="选择月">
                </el-date-picker>
            </div>
            <div id="lirunbiao">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            type="expand"
                            prop=""
                            label=""
                            width="180">
                        <template slot-scope="scope">
                            <div>
                                11111
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="项目"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            type="index"
                            prop=""
                            label="行次"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="nian"
                            label="本年累计金额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.nian < 0" style="color:#E43838">{{scope.row.nian}}</span>
                            <span v-else style="color:#606972">{{scope.row.nian}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="qi"
                            label="本期金额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.qi < 0" style="color:#E43838">{{scope.row.qi}}</span>
                            <span v-else style="color:#606972">{{scope.row.qi}}</span>
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
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        mounted() {
            this.getStorage()
            this.list()

        },
        data() {
        return {
            date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),

            tableData: [
                {
                    name:'一、营业收入',
                    nian:'',
                    qi:''
                },
                {
                    name:'减：营业成本',
                    nian:'',
                    qi:''
                },
                {
                    name:'税金及附加',
                    nian:'',
                    qi:''
                },
                {
                    name:'销售费用',
                    nian:'',
                    qi:''
                },{
                    name:'管理费用',
                    nian:'',
                    qi:''
                },
                {
                    name:'财务费用',
                    nian:'',
                    qi:''
                },
                {
                    name:'其中：利息费用（收入以“-”号填列）',
                    nian:'',
                    qi:''
                },
                {
                    name:'加：投资收益（亏损以“-”号填写）',
                    nian:'',
                    qi:''
                },
                {
                    name:'二、营业收益（亏损以“-”号填写）',
                    nian:'',
                    qi:''
                },
                {
                    name:'加：营业外收入',
                    nian:'',
                    qi:''
                },
                {
                    name:'减：营业外支出',
                    nian:'',
                    qi:''
                },
                {
                    name:'利润总额（亏损总额以“-”号填列）',
                    nian:'2',
                    qi:'3'
                },
                {
                    name:'减：所得税费用',
                    nian:'',
                    qi:''
                },
                {
                    name:'四、净利润（净亏损以“-”号填列）',
                    nian:'',
                    qi:''
                },
            ],
            total:100,
            dangqianye:1
        }
        },
        methods: {
            list(){
                this._ajax('userReportForm/selectProfit',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    // timeMonth:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                    timeYear:new Date().getFullYear()
                }, msg => {
                    this.tableData[0].nian =  msg.debitTotalMoney
                    this.tableData[1].nian =  msg.creditTotalMoney
                    this.tableData[2].nian =  msg.taxAddMoney
                    this.tableData[3].nian =  msg.salesMoney
                    this.tableData[4].nian =  msg.manageMoney
                    this.tableData[5].nian =  msg.financeMoney
                    this.tableData[6].nian =  msg.interestMoney
                    this.tableData[7].nian =  msg.investmentMoney
                    this.tableData[8].nian =  msg.businessProfitMoney
                    this.tableData[9].nian =  msg.outIncomeMoney
                    this.tableData[10].nian =  msg.businessOutSeMoney
                    this.tableData[11].nian =  msg.profitTotalMoney
                    this.tableData[12].nian =  msg.incomeTaxMoney
                    this.tableData[13].nian =  msg.netProfitMoney

                    // this._message(1,"年成功")
                })
                this._ajax('userReportForm/selectProfit',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    timeMonth:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                    // timeYear:new Date().getFullYear()
                }, msg => {
                    this.tableData[0].qi =  msg.debitTotalMoney
                    this.tableData[1].qi =  msg.creditTotalMoney
                    this.tableData[2].qi =  msg.taxAddMoney
                    this.tableData[3].qi =  msg.salesMoney
                    this.tableData[4].qi =  msg.manageMoney
                    this.tableData[5].qi =  msg.financeMoney
                    this.tableData[6].qi =  msg.interestMoney
                    this.tableData[7].qi =  msg.investmentMoney
                    this.tableData[8].qi =  msg.businessProfitMoney
                    this.tableData[9].qi =  msg.outIncomeMoney
                    this.tableData[10].qi =  msg.businessOutSeMoney
                    this.tableData[11].qi =  msg.profitTotalMoney
                    this.tableData[12].qi =  msg.incomeTaxMoney
                    this.tableData[13].qi =  msg.netProfitMoney

                    // this._message(1,"期成功")
                })
            },
            change_date(){
                this.dangqianye = 1
                this.list()
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
                // if (rowIndex%2 != 0) {
                //     return 'lan';
                // }
                // return "";
                return row.open ? '' : 'expand';
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            expor(){

            }
        },
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }

    .expand .el-table__expand-column .cell {
        display: none;
    }
</style>