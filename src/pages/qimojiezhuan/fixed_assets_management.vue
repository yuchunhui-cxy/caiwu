<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">固定资产管理</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="overflow-x: auto;width: 100%;white-space: nowrap;">
                    <el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">
                        <el-form-item label="名称：">
                            <el-input v-model="form.name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="开始使用日期：">
                            <el-date-picker
                                    v-model="form.date"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" icon="el-icon-search" style="margin-left: 1vw" @click="search">搜索</el-button>
                    <el-button type="" icon="" style="margin-left: 1vw" @click="del_many">批量删除</el-button>
                </div>

                <div>
                    <el-table
                            @selection-change="handleSelectionChange"
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                type="index"
                                prop=""
                                label="编号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="assetClassify"
                                label="资产类别">
                        </el-table-column>
                        <el-table-column
                                prop="assetName"
                                label="资产名称">
                        </el-table-column>
                        <el-table-column
                                prop="startDate"
                                label="开始使用日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="zMoeny"
                                label="资产原值"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="setZMoney"
                                label="累计折旧">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="资产净值">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="del_one(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="$router.push({path:'/home/qimojiezhuan/fixed_assets_management_editor',query:{id:scope.row.id}})" type="text" size="small">编辑</el-button>
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

                <div style="text-align: center;margin-top: 2vh">
                    <el-button type="info" @click="$router.push({path:'/home/qimojiezhuan/one',query:{date:$route.query.date}})">返回</el-button>
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
                multi:'',
                form:{
                    date:'',
                    name:''
                },
            }
        },
        mounted(){
            // console.log(Array(2).join(0) + (Number(new Date().getMonth())+1) )
            this.getStorage()
            this.list()
        },
        methods: {
            del(){
                this._ajax('userHomePage/delectOldCargo',{
                    id:this.multi
                }, msg => {
                    this._message(1,"删除成功")
                    this.multi = ''
                    this.list()
                })
            },
            del_one(row){
                this.multi = row.id
                this.del()
            },
            del_many(){
                if(this.multi == '' ){
                    this._message(2,"请至少选择一项")
                    return
                }
                this.del()
            },
            search(){
                this.dangqianye = 1
                this.list()
            },
            list(){
                let startDay = ''
                let endDay = ''
                if(this.form.date != ''){
                    startDay = new Date(this.form.date[0]).getFullYear() + '-' + (Array(2).join(0) + (Number(new Date(this.form.date[0]).getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + (Number(new Date(this.form.date[0]).getDate()))).slice(-2)
                    endDay = new Date(this.form.date[0]).getFullYear() + '-' + (Array(2).join(0) + (Number(new Date(this.form.date[1]).getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + (Number(new Date(this.form.date[1]).getDate()))).slice(-2)
                }
                this._ajax('userHomePage/selectOldCargo',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    time:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    name:this.form.name,
                    startDay,
                    endDay

                }, msg => {
                    this.tableData = msg.PageInfo.list
                    this.total = msg.PageInfo.total
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
                this.pageSize = val
                this.list()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye = val
                this.list()
            },
            handleSelectionChange(val) {
                const l = val.map(item=>{
                    return item.id
                })
                this.multi = l.join(',')
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