<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">资产负债表</div>
            <div style="display: flex;justify-content: flex-end">
                <el-button @click="exportFunc('id','资产负债表')" type="warning">导出</el-button>
                <el-date-picker
                        @change ="change_date"
                        value-format="yyyy-MM"
                        style="margin-left: 20px"
                        v-model="date"
                        type="month"
                        placeholder="选择月">
                </el-date-picker>
            </div>
            <div id="id">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="name"
                            label="资产"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="index"
                            label="行次"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="qimo"
                            label="期末余额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.qimo < 0" style="color:#E43838">{{scope.row.qimo}}</span>
                            <span v-else style="color:#606972">{{scope.row.qimo}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="nianchu"
                            label="年初余额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.nianchu < 0" style="color:#E43838">{{scope.row.nianchu}}</span>
                            <span v-else style="color:#606972">{{scope.row.nianchu}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name1"
                            label="负债和所有者权益"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="index1"
                            label="行次"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="qimo1"
                            label="期末余额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.qimo1 < 0" style="color:#E43838">{{scope.row.qimo1}}</span>
                            <span v-else style="color:#606972">{{scope.row.qimo1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="nianchu1"
                            label="年初余额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.nianchu1 < 0" style="color:#E43838">{{scope.row.nianchu1}}</span>
                            <span v-else style="color:#606972">{{scope.row.nianchu1}}</span>
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
                        <!--:page-size="pageSize"-->
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
                    {name:"流动资产",index:'',qimo:'',nianchu:'',name1:'流动负债',index1:'',qimo1:'',nianchu1:''},
                    {name:"货币资金",index:'1',qimo:'',nianchu:'',name1:'短期借款',index1:'31',qimo1:'',nianchu1:''},
                    {name:"短期投资",index:'2',qimo:'',nianchu:'',name1:'应付票据',index1:'32',qimo1:'',nianchu1:''},
                    {name:"应收票据",index:'3',qimo:'',nianchu:'',name1:'应付账款',index1:'33',qimo1:'',nianchu1:''},
                    {name:"应收账款",index:'4',qimo:'',nianchu:'',name1:'预收账款',index1:'34',qimo1:'',nianchu1:''},
                    {name:"预付账款",index:'5',qimo:'',nianchu:'',name1:'应付职工薪酬',index1:'35',qimo1:'',nianchu1:''},
                    {name:"应收股利",index:'6',qimo:'',nianchu:'',name1:'应交税费',index1:'36',qimo1:'',nianchu1:''},
                    {name:"应收利息",index:'7',qimo:'',nianchu:'',name1:'应付利息',index1:'37',qimo1:'',nianchu1:''},
                    {name:"其他应收款",index:'8',qimo:'',nianchu:'',name1:'应付利润',index1:'38',qimo1:'',nianchu1:''},
                    {name:"其他流动资产",index:'9',qimo:'',nianchu:'',name1:'其他流动负债',index1:'39',qimo1:'',nianchu1:''},
                    {name:"流动资产合计",index:'10',qimo:'',nianchu:'',name1:'流动负债合计',index1:'40',qimo1:'',nianchu1:''},
                    {name:"存货",index:'11',qimo:'',nianchu:'',name1:'其他应付款',index1:'41',qimo1:'',nianchu1:''},
                    {name:"库存商品",index:'12',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},
                    {name:"在产品",index:'13',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},
                    {name:"周转材料",index:'14',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},
                    // {name:"商品进销差价",index:'15',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},
                    {name:"原材料",index:'15',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},




                    {name:"非流动资产",index:'',qimo:'',nianchu:'',name1:'非流动负债',index1:'',qimo1:'',nianchu1:''},
                    {name:"长期债权投资",index:'16',qimo:'',nianchu:'',name1:'长期借款',index1:'42',qimo1:'',nianchu1:''},
                    {name:"长期股权投资",index:'17',qimo:'',nianchu:'',name1:'长期应付款',index1:'43',qimo1:'',nianchu1:''},
                    {name:"固定资产原价",index:'18',qimo:'',nianchu:'',name1:'递延收益',index1:'44',qimo1:'',nianchu1:''},
                    {name:"减：累计折旧",index:'19',qimo:'',nianchu:'',name1:'其他非流动负债',index1:'45',qimo1:'',nianchu1:''},
                    {name:"固定资产账面价值",index:'20',qimo:'',nianchu:'',name1:'非流动负债合计',index1:'46',qimo1:'',nianchu1:''},
                    {name:"在建工程",index:'21',qimo:'',nianchu:'',name1:'负债合计',index1:'47',qimo1:'',nianchu1:''},
                    {name:"工程物资",index:'22',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},
                    {name:"固定资产清理",index:'23',qimo:'',nianchu:'',name1:'',index1:'',qimo1:'',nianchu1:''},
                    {name:"生产性生物资产",index:'24',qimo:'',nianchu:'',name1:'所有者权益（或股东权益）',index1:'',qimo1:'',nianchu1:''},
                    {name:"无形资产",index:'25',qimo:'',nianchu:'',name1:'实收资本（或股东）',index1:'48',qimo1:'',nianchu1:''},
                    {name:"开发支出",index:'26',qimo:'',nianchu:'',name1:'资本公积',index1:'49',qimo1:'',nianchu1:''},
                    {name:"长期待摊费用",index:'27',qimo:'',nianchu:'',name1:'盈余公积',index1:'50',qimo1:'',nianchu1:''},
                    {name:"其他非流动资产",index:'28',qimo:'',nianchu:'',name1:'未分配利润',index1:'51',qimo1:'',nianchu1:''},
                    {name:"非流动资产合计",index:'29',qimo:'',nianchu:'',name1:'所有者权益（或股东权益）合计',index1:'52',qimo1:'',nianchu1:''},

                    {name:"资产合计",index:'30',qimo:'',nianchu:'',name1:'负债和所有者权益（或股东权益）',index1:'53',qimo1:'',nianchu1:''},


                ],
                total:100,
                dangqianye:1,
                pageSize:10,
            }
        },
        methods: {
            change_date(){
                // this.dangqianye = 1
                this.list()
            },
            list(){
                this._ajax('userReportForm/selectLiabilities',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    timeMonth:this.date,
                }, msg => {
                    this.tableData[1].qimo = msg.CurrentAssets.MonetaryFunds.beginningMoney
                    this.tableData[1].nianchu = msg.CurrentAssets.MonetaryFunds.nowMoney
                    this.tableData[1].qimo1 = msg.CurrentLiabilities.ShortTermBorrowing.beginningMoney
                    this.tableData[1].nianchu1 = msg.CurrentLiabilities.ShortTermBorrowing.nowMoney

                    this.tableData[2].qimo = msg.CurrentAssets.ShortInvestmentNumber.beginningMoney
                    this.tableData[2].nianchu = msg.CurrentAssets.ShortInvestmentNumber.nowMoney
                    this.tableData[2].qimo1 = msg.CurrentLiabilities.NotesPayable.beginningMoney
                    this.tableData[2].nianchu1 = msg.CurrentLiabilities.NotesPayable.nowMoney

                    this.tableData[3].qimo = msg.CurrentAssets.NotesReceivable.beginningMoney
                    this.tableData[3].nianchu = msg.CurrentAssets.NotesReceivable.nowMoney
                    this.tableData[3].qimo1 = msg.CurrentLiabilities.AccountsPayable.beginningMoney
                    this.tableData[3].nianchu1 = msg.CurrentLiabilities.AccountsPayable.nowMoney

                    this.tableData[4].qimo = msg.CurrentAssets.AccountsReceivable.beginningMoney
                    this.tableData[4].nianchu = msg.CurrentAssets.AccountsReceivable.nowMoney
                    this.tableData[4].qimo1 = msg.CurrentLiabilities.AdvanceReceipt.beginningMoney
                    this.tableData[4].nianchu1 = msg.CurrentLiabilities.AdvanceReceipt.nowMoney

                    this.tableData[5].qimo = msg.CurrentAssets.Advances.beginningMoney
                    this.tableData[5].nianchu = msg.CurrentAssets.Advances.nowMoney
                    this.tableData[5].qimo1 = msg.CurrentLiabilities.PayableRemuneration.beginningMoney
                    this.tableData[5].nianchu1 = msg.CurrentLiabilities.PayableRemuneration.nowMoney

                    this.tableData[6].qimo = msg.CurrentAssets.DividendsReceivable.beginningMoney
                    this.tableData[6].nianchu = msg.CurrentAssets.DividendsReceivable.nowMoney
                    this.tableData[6].qimo1 = msg.CurrentLiabilities.DutiableFees.beginningMoney
                    this.tableData[6].nianchu1 = msg.CurrentLiabilities.DutiableFees.nowMoney

                    this.tableData[7].qimo = msg.CurrentAssets.InterestReceivable.beginningMoney
                    this.tableData[7].nianchu = msg.CurrentAssets.InterestReceivable.nowMoney
                    this.tableData[7].qimo1 = msg.CurrentLiabilities.InterestPayable.beginningMoney
                    this.tableData[7].nianchu1 = msg.CurrentLiabilities.InterestPayable.nowMoney

                    this.tableData[8].qimo = msg.CurrentAssets.OtherReceivables.beginningMoney
                    this.tableData[8].nianchu = msg.CurrentAssets.OtherReceivables.nowMoney
                    this.tableData[8].qimo1 = msg.CurrentLiabilities.ProfitPayable.beginningMoney
                    this.tableData[8].nianchu1 = msg.CurrentLiabilities.ProfitPayable.nowMoney

                    // 其他流动资产
                    this.tableData[9].qimo = msg.CurrentAssets.OtherCurrentAssets.beginningMoney
                    this.tableData[9].nianchu = msg.CurrentAssets.OtherCurrentAssets.beginningMoney
                    this.tableData[9].qimo1 = 0
                    this.tableData[9].nianchu1 = 0

                    // 流动资产合计
                    this.tableData[10].qimo = msg.CurrentAssets.TotalCurrentAssets.beginningMoney
                    this.tableData[10].nianchu = msg.CurrentAssets.TotalCurrentAssets.nowMoney
                    this.tableData[10].qimo1 = msg.CurrentLiabilities.TotalCurrentLiabilities.beginningMoney
                    this.tableData[10].nianchu1 = msg.CurrentLiabilities.TotalCurrentLiabilities.nowMoney

                    // 存货
                    this.tableData[11].qimo = msg.CurrentAssets.Stock.beginningMoney
                    this.tableData[11].nianchu = msg.CurrentAssets.Stock.nowMoney
                    this.tableData[11].qimo1 = msg.CurrentLiabilities.OtherAccountsPayable.beginningMoney
                    this.tableData[11].nianchu1 = msg.CurrentLiabilities.OtherAccountsPayable.nowMoney

                    this.tableData[12].qimo = msg.CurrentAssets.InProducts.beginningMoney
                    this.tableData[12].nianchu = msg.CurrentAssets.InProducts.nowMoney

                    this.tableData[13].qimo = msg.CurrentAssets.Turnover.beginningMoney
                    this.tableData[13].nianchu = msg.CurrentAssets.Turnover.nowMoney

                    this.tableData[14].qimo = msg.CurrentAssets.AccountsReceivable.beginningMoney
                    this.tableData[14].nianchu = msg.CurrentAssets.AccountsReceivable.nowMoney

                    // this.tableData[15].qimo = msg.CurrentAssets.CommoditySpreads.beginningMoney
                    // this.tableData[15].nianchu = msg.CurrentAssets.CommoditySpreads.nowMoney

                    this.tableData[15].qimo = msg.CurrentAssets.RawMaterial.beginningMoney
                    this.tableData[15].nianchu = msg.CurrentAssets.RawMaterial.nowMoney

                    // 非流动资产
                    this.tableData[17].qimo = msg.NonCurrentAssets.BondInvestment.beginningMoney
                    this.tableData[17].nianchu = msg.NonCurrentAssets.BondInvestment.nowMoney
                    this.tableData[17].qimo1 = msg.NonCurrentLiabilities.LongTermBorrowing.beginningMoney
                    this.tableData[17].nianchu1 = msg.NonCurrentLiabilities.LongTermBorrowing.nowMoney

                    this.tableData[18].qimo = msg.NonCurrentAssets.EquityInvestment.beginningMoney
                    this.tableData[18].nianchu = msg.NonCurrentAssets.EquityInvestment.nowMoney
                    this.tableData[18].qimo1 = msg.NonCurrentLiabilities.LongTermAccountsPayable.beginningMoney
                    this.tableData[18].nianchu1 = msg.NonCurrentLiabilities.LongTermAccountsPayable.nowMoney

                    this.tableData[19].qimo = msg.NonCurrentAssets.FixedAssets.beginningMoney
                    this.tableData[19].nianchu = msg.NonCurrentAssets.FixedAssets.nowMoney
                    this.tableData[19].qimo1 = msg.NonCurrentLiabilities.DeferredEarnings.beginningMoney
                    this.tableData[19].nianchu1 = msg.NonCurrentLiabilities.DeferredEarnings.nowMoney

                    //累计折旧
                    this.tableData[20].qimo = 0
                    this.tableData[20].nianchu = 0
                    this.tableData[20].qimo1 = 0
                    this.tableData[20].nianchu1 = 0

                    this.tableData[21].qimo = msg.NonCurrentAssets.BookValueOfFixedAssets.beginningMoney
                    this.tableData[21].nianchu = msg.NonCurrentAssets.BookValueOfFixedAssets.nowMoney
                    this.tableData[21].qimo1 = msg.NonCurrentLiabilities.TotalNonCurrentLiabilities.beginningMoney
                    this.tableData[21].nianchu1 = msg.NonCurrentLiabilities.TotalNonCurrentLiabilities.nowMoney

                    this.tableData[22].qimo = msg.NonCurrentAssets.ConstructionInProgress.beginningMoney
                    this.tableData[22].nianchu = msg.NonCurrentAssets.ConstructionInProgress.nowMoney
                    this.tableData[22].qimo1 = msg.ThreeTotals.TotalLiabilities.beginningMoney
                    this.tableData[22].nianchu1 = msg.ThreeTotals.TotalLiabilities.nowMoney

                    this.tableData[23].qimo = msg.NonCurrentAssets.EngineeringMaterials.beginningMoney
                    this.tableData[23].nianchu = msg.NonCurrentAssets.EngineeringMaterials.nowMoney


                    this.tableData[24].qimo = msg.NonCurrentAssets.AssetClearance.beginningMoney
                    this.tableData[24].nianchu = msg.NonCurrentAssets.AssetClearance.nowMoney


                    this.tableData[25].qimo = msg.NonCurrentAssets.BiologicalAssets.beginningMoney
                    this.tableData[25].nianchu = msg.NonCurrentAssets.BiologicalAssets.nowMoney


                    this.tableData[26].qimo = msg.NonCurrentAssets.IntangibleAssets.beginningMoney
                    this.tableData[26].nianchu = msg.NonCurrentAssets.IntangibleAssets.nowMoney
                    this.tableData[26].qimo1 = msg.OwnersEquity.PaidInCapital.beginningMoney
                    this.tableData[26].nianchu1 = msg.OwnersEquity.PaidInCapital.nowMoney

                    this.tableData[27].qimo = msg.NonCurrentAssets.DevelopmentExpenditure.beginningMoney
                    this.tableData[27].nianchu = msg.NonCurrentAssets.DevelopmentExpenditure.nowMoney
                    this.tableData[27].qimo1 = msg.OwnersEquity.CapitalReserve.beginningMoney
                    this.tableData[27].nianchu1 = msg.OwnersEquity.CapitalReserve.nowMoney

                    this.tableData[28].qimo = msg.NonCurrentAssets.LongExpensesToBeApportioned.beginningMoney
                    this.tableData[28].nianchu = msg.NonCurrentAssets.LongExpensesToBeApportioned.nowMoney
                    this.tableData[28].qimo1 = msg.OwnersEquity.SurplusReserve.beginningMoney
                    this.tableData[28].nianchu1 = msg.OwnersEquity.SurplusReserve.nowMoney

                    //其他非流动资产
                    this.tableData[29].qimo = 0
                    this.tableData[29].nianchu = 0
                    this.tableData[29].qimo1 = msg.OwnersEquity.UndistributedProfit.beginningMoney
                    this.tableData[29].nianchu1 = msg.OwnersEquity.UndistributedProfit.nowMoney

                    this.tableData[30].qimo = msg.NonCurrentAssets.TotalNonCurrentAssets.beginningMoney
                    this.tableData[30].nianchu = msg.NonCurrentAssets.TotalNonCurrentAssets.nowMoney
                    this.tableData[30].qimo1 = msg.OwnersEquity.TotalOwnersEquity.beginningMoney
                    this.tableData[30].nianchu1 = msg.OwnersEquity.TotalOwnersEquity.nowMoney

                    this.tableData[31].qimo = msg.ThreeTotals.TotalAssets.nowMoney
                    this.tableData[31].nianchu = msg.ThreeTotals.TotalAssets.nowMoney
                    this.tableData[31].qimo1 = msg.ThreeTotals.LiabilitiesAndOwnersEquity.nowMoney
                    this.tableData[31].nianchu1 = msg.ThreeTotals.LiabilitiesAndOwnersEquity.nowMoney

                    // this._message(1,"tableData成功")
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