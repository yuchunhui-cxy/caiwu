<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">员工/五险一金管理</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="overflow-x: auto;width: 100%;white-space: nowrap;">
                    <el-button type="warning" @click="add">添加人员</el-button>
                    <el-button type="warning" @click="set">五险一金设置</el-button>

                    <!--<el-switch-->
                            <!--v-model="swit"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949"-->
                            <!--active-text="当月发放"-->
                            <!--inactive-text="次月发放">-->
                    <!--</el-switch>-->

                    <el-form :inline="true" :model="form"  style="display: inline-block;vertical-align: top">
                        <el-form-item label="编号">
                            <el-input clearable v-model="form.number" placeholder="" style="width: 100px;"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input clearable v-model="form.name" placeholder="" style="width: 100px;"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
                    <el-button type="warning" @click="del()">批量删除</el-button>

                </div>

                <div>
                    <el-table
                            @selection-change="handleSelectionChange"
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="workerNumber"
                                label="编码">
                        </el-table-column>
                        <el-table-column
                                prop="workerName"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="workerJob"
                                label="部门">
                        </el-table-column>
                        <el-table-column
                                prop="workerCard"
                                label="身份证号">
                        </el-table-column>
                        <el-table-column
                                prop="workerPhone"
                                label="手机"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                width="150"
                                label="计提工资科目">
                            <template slot-scope="scope">
                                <span v-if="scope.row.workerSalarySubject  ==  0">销售费用</span>
                                <span v-else-if="scope.row.workerSalarySubject  ==  1">管理费用</span>
                                <span v-else-if="scope.row.workerSalarySubject  ==  2">研发费用</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="员工状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.workerStatus  ==  0">在职</span>
                                <span v-else-if="scope.row.workerStatus  ==  1">离职</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="remarks"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                                <el-button type="text" size="small" @click="editor(scope.row)">编辑</el-button>
                                <el-button @click="del_one(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div style="display: flex;justify-content: flex-end;margin-top: 1vh">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[10,20,30,40]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>

            </div>

        </div>
        <!--<addPingZheng></addPingZheng>-->
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    import addPingZheng from "@/components/yuchunhui/add_pingzheng"

    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],
        components:{
            addPingZheng
        },
        data() {
            return {
                tableData: [{}],
                total:0,
                page:1,
                pageSize:10,
                form:{
                    number:'',
                    name:''
                },
                swit:'',
                multi:''
            }
        },
        mounted(){
            this.getStorage()

            this.list()
        },
        methods: {
            // 加载tablData
            list(){
                this._ajax('weChatWork/selectWorkerList',{
                    uuid:this.uuid,
                    accountId:this.accountId,
                    number:this.form.number,
                    name:this.form.name,
                    page:this.page,
                    pageSize:this.pageSize
                }, msg => {
                    this.tableData = msg.PageInfo.list
                    this.total = msg.PageInfo.total
                    // this._message(1,"tableData成功")
                })
            },
            // 批量删除
            del(){
                if(this.multi == '' ){
                    this._message(2,"请至少选择一项")
                    return
                }
                this._ajax('weChatWork/delectWorker',{
                  id:this.multi
                }, msg => {
                    this._message(1,"删除成功")
                    this.multi = ''
                    this.list()
                })
            },
            // 改变每页条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.list()
            },
            // 当前页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val
                this.list()
            },
            // 复选框
            handleSelectionChange(val) {
                const l = val.map(item=>{
                    return item.id
                })
                this.multi = l.join(',')
            },
            // 删除一个
            del_one(row){
                this.multi = row.id
                this.del()
            },
            // 搜索
            search(){
                this.page = 1
                this.list()
            },
            // 详情
            handleClick(row) {
                this.$router.push({path:"/home/wuxianyijin/detail",query:{id:row.id}})

            },

            // 添加人员
            add(){
                this.$router.push({path:"/home/wuxianyijin/add_set_yuangong",query:{type:"add"}})
            },
            // 五险一金设置
            set(){
                this.$router.push({path:"/home/wuxianyijin/wuxianyijin_set"})

            },
            // 编辑
            editor(row){
                this.$router.push({path:"/home/wuxianyijin/add_set_yuangong",query:{type:"editor",id:row.id}})
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
</style>