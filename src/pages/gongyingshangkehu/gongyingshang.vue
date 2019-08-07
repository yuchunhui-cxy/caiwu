<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">供应商/客户管理</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">

                <div style="overflow-x: auto;width: 100%;white-space: nowrap;">
                        <el-button type="warning" @click="add">添加</el-button>
                        <el-button type="warning" @click="del()">批量删除</el-button>
                        <el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">
                            <el-form-item label="公司名">
                                <el-input clearable v-model="form.name" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="行业">
                                <el-select clearable v-model="form.companyIndustry" placeholder="请选择" style="width: 100%;">
                                    <el-option :label="item" :value="item" v-for="item in list" :key="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>

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
                                prop="companySupplierName"
                                label="公司名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="companyIndustry"
                                label="行业"
                                width="180">
                            <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.companyPeopleJob  ==  0">上层管理</span>-->
                                <!--<span v-else-if="scope.row.companyPeopleJob  ==  1">财务部门</span>-->
                                <!--<span v-else-if="scope.row.companyPeopleJob  ==  2">人事部门</span>-->
                                <!--<span v-else-if="scope.row.companyPeopleJob  ==  3">其他部门</span>-->
                            <!--</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="companyAddress"
                                label="地址">
                        </el-table-column>
                        <el-table-column
                                prop="companyPeople"
                                label="联系人"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="联系人职务"
                                width="290">
                            <template slot-scope="scope">
                                <span v-if="scope.row.companyPeopleJob  === '0'">上层部门（董事长、总经理、总经理秘书）</span>
                                <span v-else-if="scope.row.companyPeopleJob  == 1">财务部门（财务总监（主管）、会计（总账会计、成本会计、往来会计）、出纳</span>
                                <span v-else-if="scope.row.companyPeopleJob  == 2">人事部门（人事经理（主管）、人事助理（文员）</span>
                                <span v-else-if="scope.row.companyPeopleJob  == 3">其他部门</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="companyPeoplePhone"
                                label="联系人电话"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="companyRemarks"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="wanglaijilu(scope.row.companySupplierName)" type="text" size="small">往来记录</el-button>
                                <el-button type="text" size="small" @click="$router.push({path:'/home/gongyingshangkehu/add_set',query:{type:'editor',id:scope.row.id}})">编辑</el-button>
                                <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
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

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :close-on-press-escape="false">
            <span>确定删除么</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ensure_del">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="往来记录" :visible.sync="dialogVisible1" width="30%" :close-on-click-modal="false" :close-on-press-escape="false">
            <span>
                <el-table
                        :data="tableData1"
                        style="width: 100%">
                        <el-table-column
                                prop="creation_time"
                                label="交易时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="金额">
                            <!--<template slot-scope="scope">-->
                            <!--<span v-if="scope.row.companyPeopleJob  ==  0">上层管理</span>-->
                            <!--<span v-else-if="scope.row.companyPeopleJob  ==  1">财务部门</span>-->
                            <!--<span v-else-if="scope.row.companyPeopleJob  ==  2">人事部门</span>-->
                            <!--<span v-else-if="scope.row.companyPeopleJob  ==  3">其他部门</span>-->
                            <!--</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="描述">
                        </el-table-column>
                        <el-table-column
                                prop="pay_user"
                                label="供应商/客户"
                                width="100">
                        </el-table-column>

                    </el-table>
                    <div style="display: flex;justify-content: flex-end;margin-top: 1vh">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="dangqianye1"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageSize1"
                            layout="total,prev, pager, next, jumper"
                            :total="total1">
                    </el-pagination>
                </div>

            </span>
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogVisible1 = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="ensure_del">确 定</el-button>-->
            <!--</span>-->
        </el-dialog>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"

    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        data() {
            return {
                name:'',
                dangqianye1:1,
                total1:0,
                pageSize1:10,
                tableData1: [],

                dialogVisible1:false,

                list:[],
                tableData: [{}],
                total:0,
                dangqianye:1,
                pageSize:10,
                form:{
                    companyIndustry:'',
                    name:''
                },
                multi:'',
                dialogVisible:false,
            }
        },
        mounted(){
            this.getStorage()
            // 行业
            this._ajax('weChatLogin/jobList',{
                workAccountId:this.accountId,
                uuid:this.uuid,
            }, msg => {
                this.list = msg[0].name.split(',')
                // this._message(1,'行业成功')
            })
            this.list1()
        },
        methods: {
            list2(){
                this._ajax('weChatSupplier/selectSupplierRecord',{
                    accountId:this.accountId,
                    uuid:this.uuid,
                    page:this.dangqianye1,
                    pageSize:this.pageSize1,
                    payUser:this.name

                }, msg => {
                    this.dialogVisible1 = true
                    this.tableData1 = msg.PageInfo.list
                    this.total1 = msg.PageInfo.total


                })
            },
            handleSizeChange1(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize1 = val
                this.list12()
            },
            handleCurrentChange1(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye1 = val
                this.list2()
            },

            // 往来记录
            wanglaijilu(name){
                this.name = name
                this.list2()
            },
            // 确定删除
            ensure_del(){
                this.del()
                this.dialogVisible = false
            },
            // 批量删除
            del(){
                if(this.multi == ''){
                    this._message(2,"请至少选择一项")
                   return
                }
                this._ajax('weChatSupplier/delectSupplierById',{
                    accountId:this.accountId,
                    uuid:this.uuid,
                    id:this.multi
                }, msg => {
                    this._message(1,"删除成功")
                    this.multi = ''
                    this.list1()
                })
            },
            // 搜索
            search(){
                this.dangqianye = 1
                this.list1()
            },
            // tableData
            list1(){
                this._ajax('weChatSupplier/selectSupplierList',{
                    accountId:this.accountId,
                    uuid:this.uuid,
                    page:this.dangqianye,
                    pageSize:this.pageSize,
                    ...this.form
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
                this.list1()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye = val
                this.list1()
            },
            // 复选框
            handleSelectionChange(val) {
                const l = val.map(item=>{
                    return item.id
                })
                this.multi = l.join(",")
            },
            // 往来记录
            handleClick(row) {
                console.log(row);
                this.$router.push({path:"/home/gongyingshangkehu/add_set"})
            },
            // 删除一个
            delClick(row){
                this.dialogVisible = true
                this.multi = row.id
            },
            // 添加
            add(){
                this.$router.push({path:"/home/gongyingshangkehu/add_set",query:{type:"add"}})
            },

        }
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
</style>