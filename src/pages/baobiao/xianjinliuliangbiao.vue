<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">现金流量表</div>
            <div style="display: flex;justify-content: flex-end">
                <el-button @click="exportFunc('id','现金流量表')" type="warning">导出</el-button>
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
                            label="项目"
                            width="400">
                        <template slot-scope="scope">
                            <span v-if="scope.row.name.includes('一') || scope.row.name.includes('二') || scope.row.name.includes('三') || scope.row.name.includes('四') || scope.row.name.includes('五')" style="font-size: 22px">{{scope.row.name}}</span>
                            <span v-else style="">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="index"
                            label="行次"
                            width="180">
                        <!--<template slot-scope="scope">-->
                            <!--<span v-if="!scope.row.hangci" style="color:rgba(64,69,75,0.3)"></span>-->
                            <!--<span v-else style="color:#606972">{{scope.row.hangci}}</span>-->
                        <!--</template>-->
                    </el-table-column>
                    <el-table-column
                            prop="nian"
                            label="本年累计金额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.leijijine < 0" style="color:#E43838">{{scope.row.nian}}</span>
                            <span v-else style="color:#606972">{{scope.row.nian}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="qi"
                            label="本期金额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.benqijine < 0" style="color:#E43838">{{scope.row.qi}}</span>
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
                        <!--:page-size="pageSize"-->
                        <!--layout="total, sizes, prev, pager, next, jumper"-->
                        <!--:total="total">-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>
        <!--<aaa :super_list="super_list" num="3" :de_list="de_list"></aaa>-->
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    import aaa from "@/pages/zujian"
    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        mounted() {
            this.getStorage()
            this.list()

        },
        components:{
            aaa
        },
        data() {
            return {
                super_list:["新闻动态","会议动态","重要会见","媒体报道","图片资料","视频资料","下载中心","媒体合作伙伴","博鳌观点"],
                de_list:[{img:'http://www.boaoforum.org/u/cms/www/201907/01110154wds0.jpg',content:'李保东秘书长会见新西兰国家党主席古...'},
                    {img:'http://www.boaoforum.org/u/cms/www/201906/27100536a91g.jpg',content:'李保东秘书长会见美国科恩公司高级顾...'},
                    {img:'http://www.boaoforum.org/u/cms/www/201906/11172421rv73.jpg',content:'李保东秘书长会见全球免疫联盟首席执...'},
                    {img:'http://www.boaoforum.org/u/cms/www/201906/19111340gcf8.jpg',content:'周小川副理事长会见爱沙尼亚央行行长...'},
                    {img:'http://www.boaoforum.org/u/cms/www/201906/07220102p98u.jpg',content:'周小川副理事长会见祖布科夫理事'},],




                    date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),

                tableData: [
                    {
                        name:'一、经营活动产生的现金流量：',
                        index:'',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'销售产成品、商品、提供劳务收到的现金',
                        index:'1',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'收到其他与经济活动有关的现金',
                        index:'2',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'购买原材料，商品，接受劳务支付的现金',
                        index:'3',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'支付的职工薪酬',
                        index:'4',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'支付的税费',
                        index:'5',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'支付其他与经营活动有关的现金',
                        index:'6',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'经营活动产生的现金流量净额',
                        index:'7',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'二、投资活动产生的现金流量：',
                        index:'',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'收回短期投资、长期债券投资和长期股权投资收到的现金',
                        index:'8',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'取得投资收益收到的现金',
                        index:'9',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'处置固定资产、无形资产和其他非流动资产收回的现金净额',
                        index:'10',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'短期投资、长期债券投资和长期股权投资支付的现金',
                        index:'11',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'购建固定资产、无形资产和其他非流动资产支付的现金',
                        index:'12',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'投资活动产生的现金流量净额',
                        index:'13',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'三、筹资活动产生的现金流量：',
                        index:'',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'取得借款收到的现金',
                        index:'14',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'吸收投资者投资收到的下您',
                        index:'15',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'偿还借款本金支付的现金',
                        index:'16',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'偿还借款利息支付的现金',
                        index:'17',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'分配利润支付的现金',
                        index:'18',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'筹资活动产生的现金流量净额',
                        index:'19',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'四、现金净增加额',
                        index:'20',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'加：期初现金余额',
                        index:'21',
                        nian:"",
                        qi:'',
                    },
                    {
                        name:'五、期末现金余额',
                        index:'22',
                        nian:"",
                        qi:'',
                    },
                    ],
                total:0,
                dangqianye:1,
                pageSize:10,
            }
        },
        mounted(){
            this.getStorage()

            this.list()

        },
        methods: {
            change_date(){
                this.dangqianye = 1
                this.list()
            },
            list() {
                this._ajax('userReportForm/selectCashFlow', {
                    uuid: this.uuid,
                    workAccountId: this.accountId,
                    timeMonth:this.date,
                }, msg => {
                    this.tableData[1].nian = msg.FirstModule.SalesReceivedCash.AmountYear
                    this.tableData[1].qi = msg.FirstModule.SalesReceivedCash.AmountMonth
                    this.tableData[2].nian = msg.FirstModule.OtherOperatingCash.AmountYear
                    this.tableData[2].qi = msg.FirstModule.OtherOperatingCash.AmountMonth
                    this.tableData[3].nian = msg.FirstModule.CashForPurchasePayment.AmountYear
                    this.tableData[3].qi = msg.FirstModule.CashForPurchasePayment.AmountMonth
                    this.tableData[4].nian = msg.FirstModule.PayableRemuneration.AmountYear
                    this.tableData[4].qi = msg.FirstModule.PayableRemuneration.AmountMonth
                    this.tableData[5].nian = msg.FirstModule.PaymentOfTaxesAndFees.AmountYear
                    this.tableData[5].qi = msg.FirstModule.PaymentOfTaxesAndFees.AmountMonth
                    this.tableData[6].nian = msg.FirstModule.ActivityRelatedCash.AmountYear
                    this.tableData[6].qi = msg.FirstModule.ActivityRelatedCash.AmountMonth
                    this.tableData[7].nian = msg.FirstModule.NetCashFlow.AmountYear
                    this.tableData[7].qi = msg.FirstModule.NetCashFlow.AmountMonth


                    this.tableData[9].nian = msg.TheSecondModule.RecoveryOfInvestmentCash.AmountYear
                    this.tableData[9].qi = msg.TheSecondModule.RecoveryOfInvestmentCash.AmountMonth
                    this.tableData[10].nian = msg.TheSecondModule.IncomeFromInvestment.AmountYear
                    this.tableData[10].qi = msg.TheSecondModule.IncomeFromInvestment.AmountMonth
                    this.tableData[11].nian = msg.TheSecondModule.CashDisposalOfAssets.AmountYear
                    this.tableData[11].qi = msg.TheSecondModule.CashDisposalOfAssets.AmountMonth
                    this.tableData[12].nian = msg.TheSecondModule.CashForInvestment.AmountYear
                    this.tableData[12].qi = msg.TheSecondModule.CashForInvestment.AmountMonth
                    this.tableData[13].nian = msg.TheSecondModule.AssetPurchasePayment.AmountYear
                    this.tableData[13].qi = msg.TheSecondModule.AssetPurchasePayment.AmountMonth
                    this.tableData[14].nian = msg.TheSecondModule.InvestmentGeneratesCash.AmountYear
                    this.tableData[14].qi = msg.TheSecondModule.InvestmentGeneratesCash.AmountMonth

                    this.tableData[16].nian = msg.TheThirdModule.CashReceivedOnLoan.AmountYear
                    this.tableData[16].qi = msg.TheThirdModule.CashReceivedOnLoan.AmountMonth
                    this.tableData[17].nian = msg.TheThirdModule.InvestorInvestment.AmountYear
                    this.tableData[17].qi = msg.TheThirdModule.InvestorInvestment.AmountMonth
                    this.tableData[18].nian = msg.TheThirdModule.RepaymentOfLoanPrincipal.AmountYear
                    this.tableData[18].qi = msg.TheThirdModule.RepaymentOfLoanPrincipal.AmountMonth
                    this.tableData[19].nian = msg.TheThirdModule.InterestOnRepaymentOfLoans.AmountYear
                    this.tableData[19].qi = msg.TheThirdModule.InterestOnRepaymentOfLoans.AmountMonth
                    this.tableData[20].nian = msg.TheThirdModule.DistributionOfProfits.AmountYear
                    this.tableData[20].qi = msg.TheThirdModule.DistributionOfProfits.AmountMonth
                    this.tableData[21].nian = msg.TheThirdModule.FundingActivities.AmountYear
                    this.tableData[21].qi = msg.TheThirdModule.FundingActivities.AmountMonth

                    this.tableData[22].nian = msg.TheFourthModule.NetIncreaseInCash.AmountYear
                    this.tableData[22].qi = msg.TheFourthModule.NetIncreaseInCash.AmountMonth
                    this.tableData[23].nian = msg.TheFourthModule.InitialCashBalance.AmountYear
                    this.tableData[23].qi = msg.TheFourthModule.InitialCashBalance.AmountMonth

                    this.tableData[24].nian = msg.FifthModule.EndCashBalance.AmountYear
                    this.tableData[24].qi = msg.FifthModule.EndCashBalance.AmountMonth
                    // this._message(1,"tableData成功")
                })
            },
            // 跨行或列
            // arraySpanMethod({row, column, rowIndex, columnIndex}) {
            //     if (rowIndex === 0) {
            //         if(columnIndex == 1 || columnIndex == 2 || columnIndex == 3){
            //             return [0, 0];
            //         }
            //         return [1, 4];
            //     }
            // },
            // 改变颜色
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 != 0) {
                    return 'lan';
                }
                return "";
            },
            // 改变每一页显示的条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 改变当前页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 导出
            expor(){

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