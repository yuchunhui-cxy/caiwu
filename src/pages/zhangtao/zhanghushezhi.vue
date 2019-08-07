<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="display: flex;justify-content: center;align-items: center">
                <div style="font-size: 30px;color: #1C2023;">
                    账户设置
                </div>
                <div style="align-self: flex-end;margin-left: 1vw;">
                    <router-link style="font-size: 14px;color: #44A0FF;text-decoration: none" :to="{path:'/home/zhangtao/zhanghushezhi_add_set',query:{type:'add'}}">新增</router-link>
                </div>
            </div>

            <div style="border: 1px solid #F8F8FF;padding:2vh 2vw;margin-top: 2vh">

                <div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="number"
                                label="编码"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="账户名称">
                        </el-table-column>
                        <el-table-column
                                prop="bank_code"
                                label="银行账号">
                        </el-table-column>
                        <el-table-column
                                prop="money_type"
                                label="币别"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="accounting_subject"
                                label="会计科目"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="$router.push({path:'/home/zhangtao/zhanghushezhi_add_set',query:{type:'editor',id:scope.row.bankCodeId}})" type="text" size="small">编辑</el-button>
                                <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
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

                <div style="display: flex;justify-content: center;margin-top: 2vh">
                    <el-button type="info" @click="$router.push({path:'/home/zhangtao/base_message_manage'})">返回</el-button>
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
                tableData: [],
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
            list(){
                this._ajax('userHomePage/selectUserBankCodeList',{
                    uuid:this.uuid,workAccountId:this.accountId,pageSize:this.pageSize,page:this.dangqianye
                }, msg => {
                    this.tableData = msg.PageInfo.list
                    this.total = msg.PageInfo.total
                    // this._message(1,"tableData成功")
                })
            },
            del(row){
                this._ajax('userHomePage/deleteUserBankCode',{
                    uuid:this.uuid,workAccountId:this.accountId,bankCodeId:row.bankCodeId
                }, msg => {
                    this._message(1,"删除成功")
                    this.list()
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
</style>