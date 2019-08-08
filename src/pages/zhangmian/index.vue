<template>
    <div style="margin-bottom: 10vh">
        <!--<div id="div" style="width: 100px;height: 100px;background: red;position: absolute;z-index: 101;">-->
            <!--<button style="position: absolute;right: 5px;bottom: 5px;">111</button>-->
        <!--</div>-->

        <!--对话框-->
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="30%">
            <div style="display: flex;">
                <div style="width: 58%;">
                    <div @click="jizhang" style="cursor:pointer;height:100px;background: #EEE;margin: 1%;display: flex;justify-content: center;align-items: center">
                        <div>
                            <div style="text-align: center">记录流水</div>
                            <div>(可自动生成凭证)</div>
                        </div>
                    </div>
                    <div style="cursor:pointer;height: 100px;background: #EEE;margin: 1%;display: flex;justify-content: center;align-items: center"  @click="fapiao">
                        <div>
                            <div style="text-align: center">上传发票</div>
                            <div>(可自动生成凭证)</div>
                        </div>
                    </div>
                </div>
                <div style="cursor:pointer;width: 38%;height: 200px;background: #EEE;margin: 1%;display: flex;justify-content: center;align-items: center" @click="pingzheng">
                    添加凭证
                </div>
            </div>
        </el-dialog>
        <div style="display: flex">
            <!--左上-->
            <div class="bg" style="width: 54%;">
                <div style="display: flex;justify-content: space-between">
                    <div class="title">流水账</div>
                    <div>
                        <el-button id="btn" ref="btn" @click="dialogVisible = true">记一笔</el-button>


                        <el-button @click="qimojiezhuan">期末结转</el-button>

                        <el-date-picker
                                @change="change_date"
                                value-format="yyyy-MM"
                                v-model="date"
                                type="month"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div style="position: relative;width: 100%;">
                    <div v-if="tableData.length != 0" style="cursor: pointer;z-index: 1;position: absolute;top: 5%;width: 100%;height: 95%;background: rgba(0,0,0,0.1)">
                        <div style="padding: 2vh 0;color: #FFF;position: absolute;bottom: 0;text-align: center;width: 100%;background: linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.6));" @click="$router.push({path:'/home/zhangmian/liushui'})">查看更多</div>
                    </div>
                    <el-table

                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="accounts_date"
                                label="日期"
                                width="">
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
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="pay_money"
                                label="支付方式"
                                width="">
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
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
            <!--右上-->
            <div class="bg" style="width: 45%;">
                <div style="margin-bottom: 3vh;">{{year}}年{{month}}月开支占比</div>
                <!--<div style="">-->
                <div id="myChart" style="width: 345px;height: 300px;display: inline-block"></div>
                <div id="myChart1" style="width: 365px;height: 300px;display: inline-block"></div>
                <!--</div>-->


            </div>
        </div>
        <div style="display: flex;margin-bottom: 10vh">
            <!--左下-->
            <div class="bg" style="width: 54%">
                <div style="display: flex;justify-content: space-between">
                    <div class="title">{{nian}} 年 {{yue}} 期财务报告</div>
                    <div class="title">单位: 万元</div>
                </div>

                <div style="display: flex;margin: 3vh 0;">
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.currencyMoney}}</div>
                        <div class="text" style="text-align: center">货币资金</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.credit}}</div>
                        <div class="text" style="text-align: center">应收账款</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.inventory}}</div>
                        <div class="text" style="text-align: center">存货</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.fixedMoney}}</div>
                        <div class="text" style="text-align: center">固定资产</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.payMoeny}}</div>
                        <div class="text" style="text-align: center">应付账款</div>
                    </div>
                </div>

                <div style="border-bottom: 1px solid #CCC"></div>

                <div style="display: flex;margin: 3vh 0">
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.zongHeMoentStr}} %</div>
                        <div class="text" style="text-align: center">综合税负率</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.payTaxes}}</div>
                        <div class="text" style="text-align: center">应交税费</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.zhuYingShou}}</div>
                        <div class="text" style="text-align: center">营业收入</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.lirunStr}}</div>
                        <div class="text" style="text-align: center">利润额</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.lirunLvStr}} %</div>
                        <div class="text" style="text-align: center">净利率</div>
                    </div>
                </div>

                <div style="display: flex;margin: 3vh 0">
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.market}}</div>
                        <div class="text" style="text-align: center">销售成本</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.workerMoeny}}</div>
                        <div class="text" style="text-align: center">职工薪酬</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.oldMoeny}}</div>
                        <div class="text" style="text-align: center">折旧</div>
                    </div>
                    <div style="flex: 1;">
                        <div class="number" style="text-align: center">{{left_bottom.nowAmortize}}</div>
                        <div class="text" style="text-align: center">本期摊销</div>
                    </div>
                </div>

            </div>

            <!--右下-->
            <div class="bg" style="width: 45%;font-size: 18px;color: #40454B;">
                决策提示
                <div style="border-bottom: 1px solid rgba(33,37,66,0.1);margin: 1vh;"></div>
                <div style="">
                    <div style="display: flex;margin: 2vh 0;">
                        <div style="width: 8px;height: 14px;background: linear-gradient(#EED88C, #DFB261);margin-right: 0.5vw"></div>
                        <div style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            管家发现您本期无票支出已经占到总支出的{{money}}％了，由此增加的税赋预计有{{nMoney}}万元。 ｘ=无票支出/总支出，y=无票支出*0.13
                        </div>
                    </div>

                    <div style="display: flex;margin: 2vh 0;">
                        <div style="width: 8px;height: 14px;background: linear-gradient(#EED88C, #DFB261);margin-right: 0.5vw"></div>
                        <div v-if="type==1" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            上期资产负债表不平提示：本期资产负债表不平，管家认为是由于期初余额设置异常，快去检查一下吧。   平衡的计算公式：资产=负债+所有者权益
                        </div>
                        <div v-else style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            显示本期资产负债表平
                        </div>
                    </div>

                    <div v-if="three==2" style="display: flex;margin: 2vh 0;">
                        <div style="width: 8px;height: 14px;background: linear-gradient(#EED88C, #DFB261);margin-right: 0.5vw"></div>
                        <div  style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            全部提示：本期税率超过行业平均值了，合法避税的途径包括缩短折旧、增加职工福利、坏账准备等。
                        </div>
                    </div>

                    <div style="display: flex;margin: 2vh 0;">
                        <div style="width: 8px;height: 14px;background: linear-gradient(#EED88C, #DFB261);margin-right: 0.5vw"></div>
                        <div  v-if="four == 1" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            当月1日到15日第一季度所得税预缴，千万不要忘记！
                        </div>
                        <div  v-if="four == 2" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            4月1日到15日第一季度所得税预缴，千万不要忘记！
                        </div>
                        <div  v-if="four == 3" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            7月1日到15日第一季度所得税预缴，千万不要忘记！
                        </div>
                        <div  v-if="four == 4" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            10月1日到15日第一季度所得税预缴，千万不要忘记！
                        </div>
                        <div  v-if="four == 5" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            1月1日到15日第一季度所得税预缴，千万不要忘记！
                        </div>
                    </div>

                    <div style="display: flex;margin: 2vh 0;">

                        <div v-if="flag1==0 && flag2 == 0" style="width: 8px;height: 14px;background: linear-gradient(#EED88C, #DFB261);margin-right: 0.5vw"></div>

                        <div v-if="flag1==0 && flag2 !=0" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            请先进行账户设置不然管家做出的报表会不准确哦。
                        </div>
                        <div v-if="flag2==0 && flag1 !=0" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            请先进行期初设置不然管家做出的报表会不准确哦。
                        </div>
                        <div v-if="flag1==0 && flag2 == 0" style="line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            请先进行账户设置和期初设置，不然管家做出的报表会不准确哦。
                        </div>

                    </div>

                    <div style="display: flex;margin: 2vh 0;">
                        <div style="width: 8px;height: 14px;background: linear-gradient(#EED88C, #DFB261);margin-right: 0.5vw"></div>
                        <div @click="$router.push('/advertisement')" style="cursor: pointer;line-height: 1;width: 95%;color: #606972;font-size: 16px">
                            全部提示：也可以向真人财务代理求助哦  > > > 
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <!--<prompt></prompt>-->



    </div>
</template>

<script>
    import mix from "@/mixins/mixins"

    export default {
        name: "index",
        mixins:[mix],
        mounted() {
            // var mendingOb = document.getElementById("btn")
            // var mendingLeft = mendingOb .offsetLeft;
            // while( mendingOb != null && mendingOb .offsetParent != null && mendingOb .offsetParent.tagName != "BODY" ){
            //     mendingLeft += mendingOb .offsetParent.offsetLeft;
            //     mendingOb = mendingOb .offsetParent;
            // }
            // document.getElementById("div").style.left = mendingLeft+ 'px'
            // var mendingTop = mendingOb .offsetTop;
            // while( mendingOb != null && mendingOb .offsetParent != null && mendingOb .offsetParent.tagName != "BODY" ){
            //     mendingTop += mendingOb .offsetParent.offsetTop;
            //     mendingOb = mendingOb .offsetParent;
            // }
            // document.getElementById("div").style.top = mendingTop+ 'px'


            this.getStorage()
            // 右上
            this._ajax('userHomePage/selectIncome',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.money0 = msg.money0
                this.money1 = msg.money1
                this.money2 = msg.money2
                this.money3 = msg.money3
                this.drawLine()
            })
            this._ajax('userHomePage/selectOutMoney',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.outMoney0 = msg.outMoney0
                this.outMoney1 = msg.outMoney1
                this.outMoney2 = msg.outMoney2
                this.outMoney3 = msg.outMoney3
                this.outMoney4 = msg.outMoney4
                this.outMoney5 = msg.outMoney5
                this.a()
            })
            // 右下
            this._ajax('userHomePage/selectCountInvoice',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
               this.money = msg.money
                this.nMoney = msg.nMoney
            })
            this._ajax('userHomePage/selectHomeType',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.type = msg.type
            })
            this._ajax('userHomePage/selectCode',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.three = msg.type
            })
            this._ajax('userHomePage/selectNewTime',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.four = msg.type
            })
            this._ajax('userCompany/selectAccountCompany',{
                id:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.flag1 = msg.flag1
                this.flag2 = msg.flag2
            })
            // 左上
            this._ajax('userAccounts/selectFlowingWater',{
                workAccountId:this.accountId,
                uuid:this.uuid,
                creationTime:this.date
            }, msg => {
                this.tableData = msg.filter((item,index)=>{
                    if(index<=2){
                        return item
                    }
                })
            })
            // 左下
            this._ajax('userFinanceReport/report',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.left_bottom = msg
                this.nian  = msg.creationTime.split('-')[0]
                this.yue  = msg.creationTime.split('-')[1]

            })
        },
        data() {
            return {
                // 左上
                date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                tableData: [],
                dialogVisible:false,
                // 左上右上使用的数据
                year:new Date().getFullYear(),
                month:(Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                // 左下
                nian:"",
                yue:'',
                left_bottom:"",
                // 右上
                money0:0,
                money1:0,
                money2:0,
                money3:0,
                outMoney0:0,
                outMoney1:0,
                outMoney2:0,
                outMoney3:0,
                outMoney4:0,
                outMoney5:0,
                // 右下
                money:'',
                nMoney:'',
                flag1:'',
                flag2:'',
                type:'',
                three:'',
                four:'',
            }
        },
        methods: {
            // 选择日期
            change_date(){
                // 保存一下用户选择的流水日期
                sessionStorage.setItem("liushui_date",JSON.stringify(this.date))

                this.year = this.date.split("-")[0]
                this.month = this.date.split("-")[1]

                // 左上
                this._ajax('userAccounts/selectFlowingWater',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                    creationTime: this.date
                }, msg => {
                    this.tableData = msg.filter((item,index)=>{
                        if(index<=2){
                            return item
                        }
                    })
                })
                // 右上
                this._ajax('userHomePage/selectIncome',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                }, msg => {
                    this.money0 = msg.money0
                    this.money1 = msg.money1
                    this.money2 = msg.money2
                    this.money3 = msg.money3
                    this.drawLine()
                })
                this._ajax('userHomePage/selectOutMoney',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                }, msg => {
                    this.outMoney0 = msg.outMoney0
                    this.outMoney1 = msg.outMoney1
                    this.outMoney2 = msg.outMoney2
                    this.outMoney3 = msg.outMoney3
                    this.outMoney4 = msg.outMoney4
                    this.outMoney5 = msg.outMoney5
                    this.a()
                })
                // 左下
                this._ajax('userFinanceReport/report',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                }, msg => {
                    this.left_bottom = msg
                })
            },
            // 关闭弹窗
            close(){
                this.dialogVisible = false
            },
            // 右边的图2
            a() {
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                myChart1.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['行政支出', '差旅交通', '薪资福利', '房租物业', '经营支出', '税费']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: this.outMoney0, name: '行政支出'},
                                {value: this.outMoney1, name: '差旅交通'},
                                {value: this.outMoney2, name: '薪资福利'},
                                {value: this.outMoney3, name: '房租物业'},
                                {value: this.outMoney4, name: '经营支出'},
                                {value: this.outMoney5, name: '税费'},

                            ]
                        }
                    ]
                });
            },
            //右边的图1
            drawLine() {
                let me = this
                console.log(this.money0,"1111")
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))

                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['销售收入', '利息收入', '服务收入', '其他收入']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: me.money0, name: '销售收入'},
                                {value: me.money2, name: '利息收入'},
                                {value: me.money1, name: '服务收入'},
                                {value: me.money3, name: '其他收入'},
                            ]
                        }
                    ]
                });
            },
            qimojiezhuan(){
                this.$router.push({path:"/home/qimojiezhuan/one",query:{date:this.date}})
            },
            jizhang(){
                this.$router.push({path:"/home/jizhang/index"})
                this.close()
            },
            pingzheng(){
                this.$router.push({path:"/home/pingzhengguanli/add_pingzheng",query:{type:"add"}})
                this.close()
            },
            fapiao(){
                this.$router.push({path:"/home/pingzhengguanli/xinzengfapiao",query:{'from':'fapiaoguanli','no_show_storage':1}})
                this.close()
            }
        }
    }
</script>

<style scoped>
    .bg {
        background: #FFF;
        margin: 1%;
        padding: 1vh 1vw;
    }

    .title {
        font-size: 18px;
        color: #40454B;
    }

    .number {
        font-size: 36px;
        color: #40454B;
    }

    .text {
        font-size: 16px;
        color: #606972;
    }
</style>