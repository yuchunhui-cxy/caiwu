<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">总账</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">
                <div style="display: flex;justify-content: flex-end">
                    <el-button type="warning" @click="exportFunc('id','总账')">导出</el-button>
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
                            style="width: 100%;">
                        <el-table-column
                                prop="accountant_code"
                                label="科目编码"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="accountant_subject"
                                label="科目名称">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="摘要">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type  == 1">期初余额</span>
                                <span v-else-if="scope.row.type  == 2">本期合计</span>
                                <span v-else-if="scope.row.type == 3">本年累计</span>
                            </template>
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
                                <span v-if="scope.row.flag  == 0">収</span>
                                <span v-else-if="scope.row.flag  == 1">支</span>
                                <span v-else-if="scope.row.flag == 2">转</span>
                                <span v-if="scope.row.direction  == 0">収</span>
                                <span v-else-if="scope.row.direction  == 1">支</span>
                                <span v-else-if="scope.row.direction == 2">转</span>
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
                            :page-sizes="[12, 24, 36, 48]"
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
        data() {
            return {
                date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:12,
            }
        },
        mounted() {
            this.getStorage()
            this.list()
        },
        methods: {
            change_date(){
                this.dangqianye = 1
                this.list()
            },
            list(){
                this._ajax('common/selectAccountBook1',{
                    // uuid:"5d0afbe77f1342739c5f6d8d84ad6d67",
                    // workAccountId:82,
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.dangqianye,
                    pageSize:this.pageSize / 3 + 1,
                    timeMonth:this.date,
                }, msg => {
                    const l = []
                    // 得到基本雏形
                    for(let i = 0;i <  msg.length -1; i++){
                        l.push({},{},{})
                    }
                    // 向里面添加数据
                    let j = 0
                    msg.forEach((item,index)=>{
                        // 最后一个不要
                        if(index == msg.length -1){
                            return
                        }
                        for(let key in item){
                            if(!key.includes("1")&&!key.includes("2")){
                                l[j+1][key.trim()] = item[key]
                                l[j+1]["type"] = 2
                            }else if(key.includes("1")){
                                l[j][key.trim()] = item[key]
                                l[j]["type"] = 1
                            }else if(key.includes("2")){
                                l[j+2][key.trim()] = item[key]
                                l[j+2]["type"] = 3
                            }
                        }
                        j+=3
                    })

                    // 添加属性
                    l.forEach(item=>{
                        Object.keys(item).forEach(ite=>{
                            item[ite.substr(0,ite.length-1)] = item[ite]
                        })
                    })

                    this.tableData = l

                    this.total = Number(msg[msg.length-1].size) * 3
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
            //
            // tableRowClassName({row, rowIndex}) {
            //     if (rowIndex%2 != 0) {
            //         return 'lan';
            //     }
            //     return "";
            // },
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
