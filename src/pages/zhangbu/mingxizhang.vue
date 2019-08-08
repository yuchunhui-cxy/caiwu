<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">明细账</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">

                <div style="display: flex;justify-content: flex-end">
                    <!--<el-button type="warning" @click="exportFunc('id','明细账')">导出</el-button>-->
                    <el-button type="warning" @click="daochu">导出</el-button>

                    <el-date-picker
                            @change ="change_date"
                            value-format="yyyy-MM"
                            style="margin-left: 20px"
                            v-model="date"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                </div>

                <div style="display: flex;margin-top: 2vh">
                    <div style="flex: 5;" id="id">
                        <el-table
                                :data="tableData"
                                style="width: 100%"
                                :row-class-name="tableRowClassName">
                            <el-table-column
                                    prop="accountant_code"
                                    label="凭证字号"
                                    width="">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type  == 2">{{scope.row.accountantCode}}</span>
                                    <span v-else>{{scope.row.accountant_code}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="certificateTime"
                                    label="生成时间"
                                    width="">
                            </el-table-column>
                            <el-table-column
                                    prop="accountant_subject"
                                    label="科目">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type  == 2">{{scope.row.accountantSubject}}</span>
                                    <span v-else>{{scope.row.accountant_subject}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="摘要">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type  == 1">期初余额</span>
                                    <span v-else-if="scope.row.type == 2">{{scope.row.certificateAbstract}}</span>
                                    <span v-else-if="scope.row.type  == 3">本期合计</span>
                                    <span v-else-if="scope.row.type == 4">本年累计</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="total_debit_money"
                                    label="借方金额"
                                    width="">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type  == 2">{{scope.row.totalDebitMoney}}</span>
                                    <span v-else>{{scope.row.total_debit_money}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="total_credit_money"
                                    label="贷方金额"
                                    width="">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type  == 2">{{scope.row.totalCreditMoney}}</span>
                                    <span v-else>{{scope.row.total_credit_money}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="方向">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.flag  == 0">借</span>
                                    <span v-else-if="scope.row.flag  == 1">贷</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="balanceMoney"
                                    label="余额">
                            </el-table-column>
                        </el-table>
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
                    <div style="flex: 4;margin-left: 1vw;overflow: auto;height: 500px;border: 1px solid #CCC;">
                        <div style="margin: 10px 0">
                            <div :class="[ i == index? 'hover' : '' ]" style="padding: 5px" v-for="(item,index) in kemu" :key="index">
                                <i style="color: deepskyblue" class="el-icon-document"></i>&nbsp;<a style="text-decoration: none" href="#" @click.prevent="change_kemu(item.accountant_code,index)">{{item.accountant_code}} - {{item.accountant_subject}}</a>
                            </div>
                            <div style="color: #909399;text-align: center" v-show="kemu.length == 0">暂无数据</div>

                        </div>


                    </div>
                </div>
            </div>




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
            this._ajax('userHomePage/selectChange',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                // uuid:"5572c28d81d044278036dbbb002fba05",
                // workAccountId:119,
                timeMonth:this.date,
            }, msg => {
                this.kemu = msg
                // this._message(1,"科目成功")
                this._ajax('common/selectDetailsAccount',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    // uuid:"5572c28d81d044278036dbbb002fba05",
                    // workAccountId:119,
                    page:this.dangqianye,
                    pageSize:this.pageSize + 1,
                    timeMonth:this.date,
                    subjectNum:msg[0].accountant_code
                }, msg => {


                    this.total = Number(msg[msg.length - 1].size)

                    msg.pop()

                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    msg.sort(compare('type'))

                    let y = this.date.split('-')[0]
                    let m = this.date.split('-')[1]

                    var lastDay= new Date(y,m,0);
                    var year = lastDay.getFullYear();
                    var month = lastDay.getMonth() + 1;
                    month = month < 10 ? '0'+ month : month;
                    var day = lastDay.getDate();
                    day = day < 10 ? '0'+day : day;

                    const x =  msg.find(item=>{
                        return item.type == 1
                    })

                    let a = x.flag

                    msg.map(item=>{
                        item.flag = a
                        if(item.type == 1){
                            item.certificateTime = year + '-' + month + "-" + '01'
                        }else if(item.type == 3 || item.type == 4){
                            item.certificateTime = year + '-' + month + "-" + day
                        }
                    })


                    this.tableData = msg
                    //
                    // const l = []
                    // // 得到基本雏形
                    // for(let i = 0;i <  msg.length -1; i++){
                    //     l.push({},{},{})
                    // }
                    // // 向里面添加数据
                    // let j = 0
                    // msg.forEach((item,index)=>{
                    //     // 最后一个不要
                    //     if(index == msg.length -1){
                    //         return
                    //     }
                    //     for(let key in item){
                    //         if(!key.includes("1")&&!key.includes("2")){
                    //             l[j][key.trim()] = item[key]
                    //             l[j]["type"] = 1
                    //             l[j]["time"] = year + '-' + month + "-" + '01'
                    //         }else if(key.includes("1")){
                    //             l[j+1][key.trim()] = item[key]
                    //             l[j+1]["type"] = 2
                    //             l[j+1]["time"] = year + '-' + month + "-" + day
                    //
                    //         }else if(key.includes("2")){
                    //             l[j+2][key.trim()] = item[key]
                    //             l[j+2]["type"] = 3
                    //             l[j+2]["time"] = year + '-' + month + "-" + day
                    //
                    //         }
                    //     }
                    //     j+=3
                    // })
                    //
                    // // 添加属性
                    // l.forEach(item=>{
                    //     Object.keys(item).forEach(ite=>{
                    //         item[ite.substr(0,ite.length-1)] = item[ite]
                    //     })
                    // })
                    //
                    // this.tableData = l
                    //
                    // this.total = Number(msg[msg.length-1].size) * 3
                })
            })

        },
        data() {
            return {
                // 默认选中第一个
                i:0,

                kemu:[],
                date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:12,
                name:""
            }
        },
        methods: {
            daochu(){
                this._ajax('zip/userDetailsAccount',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    timeMonth:this.date,
                    subjectNum:this.name


                }, msg => {

                })
            },

            change_kemu(data,index){
                this.i = index

                this.dangqianye = 1
                this.name = data
                this.list()
            },
            change_date(){
                this.tableData = []
                this.dangqianye = 1
                this.i= 0

                this._ajax('userHomePage/selectChange',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    // uuid:"5572c28d81d044278036dbbb002fba05",
                    // workAccountId:119,
                    timeMonth:this.date,
                }, msg => {
                    this.kemu = msg
                    // this._message(1,"科目成功")
                    this._ajax('common/selectDetailsAccount',{
                        uuid:this.uuid,
                        workAccountId:this.accountId,
                        // uuid:"5572c28d81d044278036dbbb002fba05",
                        // workAccountId:119,
                        page:this.dangqianye,
                        pageSize:this.pageSize + 1,
                        timeMonth:this.date,
                        subjectNum:msg[0].accountant_code,
                    }, msg => {
                        this.total = Number(msg[msg.length - 1].size)

                        msg.pop()

                        function compare(property){
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value1 - value2;
                            }
                        }
                        msg.sort(compare('type'))

                        let y = this.date.split('-')[0]
                        let m = this.date.split('-')[1]

                        var lastDay= new Date(y,m,0);
                        var year = lastDay.getFullYear();
                        var month = lastDay.getMonth() + 1;
                        month = month < 10 ? '0'+ month : month;
                        var day = lastDay.getDate();
                        day = day < 10 ? '0'+day : day;

                        const x =  msg.find(item=>{
                            return item.type == 1
                        })

                        let a = x.flag

                        msg.map(item=>{
                            item.flag = a
                            if(item.type == 1){
                                item.certificateTime = year + '-' + month + "-" + '01'
                            }else if(item.type == 3 || item.type == 4){
                                item.certificateTime = year + '-' + month + "-" + day
                            }
                        })


                        this.tableData = msg



                    })
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
            },
            list(){
                this.tableData = []
                this._ajax('common/selectDetailsAccount',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    // uuid:"5d0afbe77f1342739c5f6d8d84ad6d67",
                    // workAccountId:82,
                    page:this.dangqianye,
                    pageSize:this.pageSize + 1,
                    timeMonth:this.date,
                    subjectNum:this.name
                }, msg => {
                    this.total = Number(msg[msg.length - 1].size)

                    msg.pop()

                    function compare(property){
                        return function(a,b){
                            var value1 = a[property];
                            var value2 = b[property];
                            return value1 - value2;
                        }
                    }
                    msg.sort(compare('type'))

                    let y = this.date.split('-')[0]
                    let m = this.date.split('-')[1]

                    var lastDay= new Date(y,m,0);
                    var year = lastDay.getFullYear();
                    var month = lastDay.getMonth() + 1;
                    month = month < 10 ? '0'+ month : month;
                    var day = lastDay.getDate();
                    day = day < 10 ? '0'+day : day;

                    const x =  msg.find(item=>{
                        return item.type == 1
                    })

                    let a = x.flag

                    msg.map(item=>{
                        item.flag = a
                        if(item.type == 1){
                            item.certificateTime = year + '-' + month + "-" + '01'
                        }else if(item.type == 3 || item.type == 4){
                            item.certificateTime = year + '-' + month + "-" + day
                        }
                    })


                    this.tableData = msg


                    // this._message(1,"tableData成功")
                })
            },

            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 != 0) {
                    return 'lan';
                }
                return "";
            }
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
    .hover{
        background: rgba(96,105,114,0.3);
        border-radius: 5px;
    }
</style>