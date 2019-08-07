<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">银行日记账</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="display: flex;justify-content: space-between">
                    <div>
                        <el-select  @change="change_yinhang" v-model="code" placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in bank"
                                    :key="index"
                                    :label="item.subjects_name"
                                    :value="item.subjects_number">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex;align-items: center">
                        <el-button type="warning" @click="exportFunc('id','银行日记账')">导出</el-button>
                        <el-date-picker
                                @change ="change_date"
                                value-format="yyyy-MM"
                                style="margin-left: 20px"
                                v-model="date"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                    </div>
                </div>
                <div id="id">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="certificate_number"
                                label="凭证字号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="certificate_time"
                                label="生成时间"
                                width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.certificate_time | set_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="accountant_subject"
                                label="科目">
                        </el-table-column>
                        <el-table-column
                                prop="certificate_abstract"
                                label="摘要">
                        </el-table-column>
                        <el-table-column
                                prop="total_debit_money"
                                label="借方金额"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="total_credit_money"
                                label="贷方金额"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="方向">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag  == 0">借</span>
                                <span v-else-if="scope.row.flag  == 1">贷</span>
                                <span v-else-if="scope.row.flag == 2">转</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="balanceMoney"
                                label="余额">
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
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        mounted() {
            this.getStorage()
            this._ajax('userHomePage/selectBanks',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                // uuid:"5d0afbe77f1342739c5f6d8d84ad6d67",
                // workAccountId:82,
            }, msg => {
                this.bank = msg
                this.code = msg[0].subjects_number
                this.list()

                // this._message(1,"银行成功")
            })
        },
        data() {
            return {
                bank:[],
                code:"",
                date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                tableData: [],

                total:0,
                dangqianye:1,
                pageSize:10,


            }
        },
        filters:{
            set_time(val){
                return val.split(" ")[0]
            }
        },
        methods: {
            change_yinhang(){
                this.dangqianye = 1
                this.list()
            },
            change_date(){
                this.dangqianye = 1
                this.list()
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
                this._ajax('common/userBooks',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    // uuid:"5d0afbe77f1342739c5f6d8d84ad6d67",
                    // workAccountId:82,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    timeMonth:this.date,
                    subjectNum:this.code
                }, msg => {
                    this.total = Number(msg[msg.length-1].size)

                    msg.pop()
                    this.tableData = msg
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

</style>