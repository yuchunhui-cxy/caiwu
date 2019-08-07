<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">科目余额表</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="display: flex;justify-content: flex-end">
                    <el-button type="warning" @click="exportFunc('id','科目余额表')">导出</el-button>
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
                                prop="accountant_code"
                                label="科目编码"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="accountant_subject"
                                label="科目名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="期初余额-借方">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag1  == 0">{{scope.row.total_debit_money1}}</span>
                                <span v-else-if="scope.row.flag1  == 1"></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="期初余额-贷方">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag1  == 0"></span>
                                <span v-else-if="scope.row.flag1  == 1">{{scope.row.total_credit_money1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="total_debit_money"
                                label="本期发生额-借方"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag  == 0">{{scope.row.total_debit_money}}</span>
                                <span v-else-if="scope.row.flag  == 1"></span>
                            </template>

                        </el-table-column>
                        <el-table-column
                                prop="total_credit_money"
                                label="本期发生额-贷方"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag  == 0"></span>
                                <span v-else-if="scope.row.flag  == 1">{{scope.row.total_credit_money}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="期末余额-借方">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag2  == 0">{{scope.row.total_debit_money2}}</span>
                                <span v-else-if="scope.row.flag2  == 1"></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="期末余额-贷方">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag2  == 0"></span>
                                <span v-else-if="scope.row.flag2  == 1">{{scope.row.total_credit_money2}}</span>
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
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:10,
            }
        },
        methods: {
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
                this._ajax('common/selectBalanceAccount',{
                    // uuid:"5d0afbe77f1342739c5f6d8d84ad6d67",
                    // workAccountId:82,
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    timeMonth:this.date,
                }, msg => {
                    this.total = Number(msg[msg.length-1].size)

                    msg.pop()
                    msg.forEach(item=>{
                        for(let i in item){
                            item[i.trim()] = item[i]
                        }
                    })
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