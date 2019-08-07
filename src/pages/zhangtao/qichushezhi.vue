<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">
                期初设置
            </div>
            <div style="border: 1px solid #F8F8FF;padding:2vh 2vw;margin-top: 2vh">
                <div style="display: flex;justify-content: space-between;align-items: flex-start">
                    <div style="display: flex;">
                        <el-button type="info" @click="a">资产</el-button>
                        <el-button type="info" @click="b">负债</el-button>
                        <el-button type="info" @click="c">权益</el-button>
                        <el-button type="info" @click="d">成本</el-button>
                        <el-button type="info" @click="e">损益</el-button>
                    </div>
                    <div style="display: flex;align-items: flex-start">
                        <el-button type="" @click="exportFunc('excel','期初报表')">导出</el-button>
                        <el-button type="" style="margin-left: 1vw" @click="balance">试算平衡</el-button>
                    </div>
                </div>
                <div id="excel">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop=""
                                label="科目编码"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.subjects_number">{{scope.row.subjects_number}}</span>
                                <span v-else>{{scope.row.subjectsNumber}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="科目名称">
                            <template slot-scope="scope">
                                <span v-if="scope.row.subjectsName">{{scope.row.subjectsName}}</span>
                                <span v-else>{{scope.row.subjects_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="方向">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag == 0">借</span>
                                <span v-else>贷</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="期初余额"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.beginning_balance">{{scope.row.beginning_balance}}</span>
                                <span v-else>{{scope.row.beginningBalance}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="借方累计"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.borrow">{{scope.row.borrow}}</span>
                                <span v-else>{{scope.row.borrow1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="贷方累计">
                            <template slot-scope="scope">
                                <span v-if="scope.row.loans">{{scope.row.loans}}</span>
                                <span v-else>{{scope.row.loans1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="年初余额">
                            <template slot-scope="scope">
                                <span v-if="scope.row.year_balance">{{scope.row.year_balance}}</span>
                                <span v-else>{{scope.row.yearBalance}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button v-show="!scope.row.year_balance && !scope.row.yearBalance" type="text" size="small" @click="add_data(scope.row)">添加数据</el-button>
                                <el-button v-show="scope.row.year_balance || scope.row.yearBalance" type="text" size="small" @click="xiugai(scope.row)">修改</el-button>
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
        <el-dialog title="试算平衡" :visible.sync="dialogVisible" width="20%" :show-close="false" :close-on-click-modal="false">
            <div>
                {{msg}}
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="20%" :show-close="false" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="期初余额" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="form.beginningBalance" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
                <el-form-item label="贷方累计" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="form.loans" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
                <el-form-item label="借方累计" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="form.borrow" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
                <el-form-item label="年初余额" label-width="100px">
                    <el-col :span="20">
                        <el-input disabled v-model="form.yearBalance" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ok_cancel">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加数据" :visible.sync="dialogVisible1" width="20%" :show-close="false" :close-on-click-modal="false">
            <el-form :model="add">
                <el-form-item label="期初余额" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="add.beginningBalance" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
                <el-form-item label="贷方累计" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="add.loans" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
                <el-form-item label="借方累计" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="add.borrow" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
                <el-form-item label="年初余额" label-width="100px">
                    <el-col :span="20">
                        <el-input disabled v-model="add.yearBalance" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        元
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1=false">取 消</el-button>
                <el-button type="primary" @click="add_ok">确 定</el-button>
            </div>
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
                // 添加时后台还要科目的名称和编号
                subjectsNumber:"",
                subjectsName:"",


                // 保存添加数据的id
                id:'',
                // 添加数据
                add:{
                    beginningBalance:'',
                    borrow:'',
                    loans:'',
                    yearBalance:''
                },
                // 添加数据
                dialogVisible1:false,

                title:'',
                form:{
                    beginningBalance:'',
                    borrow:'',
                    loans:'',
                    yearBalance:''
                },
                dialogFormVisible:false,
                // 筛选条件
                type:'',
                // 试算平衡
                msg:'',
                dialogVisible:false,
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
        watch: {
            form: {
                handler(newName, oldName) {
                    if(this.form.beginningBalance && this.form.loans && this.form.borrow){
                        this.form.yearBalance = Number(this.form.beginningBalance) + Number(this.form.loans) - Number(this.form.borrow)
                    }
                },
                // immediate: true,
                deep: true
            },
            add: {
                handler(newName, oldName) {
                    if(this.add.beginningBalance && this.add.loans && this.add.borrow){
                        this.add.yearBalance = Number(this.add.beginningBalance) + Number(this.add.loans) - Number(this.add.borrow)
                    }
                },
                // immediate: true,
                deep: true
            }
        },
        methods: {
            // 添加数据
            add_data(row){
                // 添加时后台还要科目的名称和编号
                this.subjectsNumber = row.subjects_number
                if(row.subjecsName){
                    this.subjectsName = row.subjectsName

                }else{
                    this.subjectsName = row.subjects_name
                }

                this.add = {
                    beginningBalance:'',
                    borrow:'',
                    loans:'',
                    yearBalance:''
                }
                if(row.subjectId == null){
                    this.id = row.id_num
                }else{
                    this.id = row.subjectId
                }
                this.dialogVisible1 = true
            },
            // 添加数据的确定
            add_ok(){
                this._ajax('userHomePage/addStartSubject',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                    ...this.add,
                    subjectId:this.id,
                    // 添加时后台还要科目的名称和编号
                    subjectsNumber:this.subjectsNumber,
                    subjectsName:this.subjectsName

                }, msg => {
                    this._message(1,"添加数据成功")
                    this.dialogVisible1 = false
                    this.list()
                })
            },


            // 修改
            xiugai(row){
                if(row.subjectId == null){
                    this.id = row.id_num
                }else{
                    this.id = row.subjectId
                }
                if(row.subjects_number){
                    this.title = row.subjects_number.toString()
                }else{
                    this.title = row.subjectsNumber.toString()
                }
                if(row.beginning_balance){
                    this.form.beginningBalance = row.beginning_balance
                }else{
                    this.form.beginningBalance = row.beginningBalance
                }
                if(row.loans){
                    this.form.loans = row.loans

                }else{
                    this.form.loans = row.loans1
                }
                if(row.borrow){
                    this.form.borrow = row.borrow

                }else{
                    this.form.borrow = row.borrow1

                }
                if(row.year_balance){
                    this.form.yearBalance = row.year_balance

                }else{
                    this.form.yearBalance = row.yearBalance
                }

                this.dialogFormVisible = true
            },
            // 修改弹框的确定
            ok(){
                let index= this.tableData.findIndex(item=>{
                    return item.subjects_number ==  this.title
                })
                this._ajax('userHomePage/updateStartSubject',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                    ...this.form,
                    subjectId:this.id
                }, msg => {
                    this._message(1,"修改成功")
                    this.dialogVisible1 = false
                    this.list()
                })
                this.dialogFormVisible = false
            },
            // 修改弹框的取消
            ok_cancel(){
                this.dialogFormVisible = false
            },

            // 试算平衡
            balance(){
                this._ajax('userHomePage/selectUserType',{
                    workAccountId:this.accountId,
                    uuid:this.uuid,
                }, msg => {
                    if(msg.type == 0){
                        this.msg = "资产总和大于负债+权益"
                    }
                    if(msg.type == 1){
                        this.msg = "资产总和小于负债+权益"
                    }
                    if(msg.type == 2){
                        this.msg = "恭喜资产试算平衡"
                    }
                    // this._message(1,"加载成功")
                    this.dialogVisible = true

                })
            },
            a(){
                this.type = 0
                this.dangqianye = 1
                this.list()
            },
            b(){
                this.type = 1
                this.dangqianye = 1

                this.list()
            },
            c(){
                this.type = 2
                this.dangqianye = 1

                this.list()
            },
            d(){
                this.type = 3
                this.dangqianye = 1

                this.list()
            },
            e(){
                this.type = 4
                this.dangqianye = 1

                this.list()
            },
            list(){
                this._ajax('userHomePage/selectStartSubjectList',{
                    uuid:this.uuid,workAccountId:this.accountId,pageSize:this.pageSize,page:this.dangqianye,type:this.type
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