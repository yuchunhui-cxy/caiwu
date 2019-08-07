<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">科目设置</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div style="display: flex;justify-content: space-between;align-items: flex-start">
                    <div style="display: flex;">
                        <el-button type="info" @click="a">资产</el-button>
                        <el-button type="info" @click="b">负债</el-button>
                        <el-button type="info" @click="c">权益</el-button>
                        <el-button type="info" @click="d">成本</el-button>
                        <el-button type="info" @click="e">损益</el-button>
                    </div>
                    <div style="display: flex;align-items: flex-start">
                        <el-button type="" @click="exportFunc('id','科目报表')">导出</el-button>
                    </div>
                </div>
                <div id="id">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="subjects_number"
                                label="科目编码"
                                width="180">
                            <template slot-scope="scope">
                                <span v-if="scope.row.flag == 1">{{scope.row.subjects_number}}</span>
                                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.subjects_number}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="subjects_name"
                                label="科目名称">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="余额方向">
                            <template slot-scope="scope">
                                <span v-if="scope.row.direction == 0">借</span>
                                <span v-else>贷</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="操作">
                            <template slot-scope="scope">
                                <el-button v-if ="scope.row.flag != 1 && scope.row.flag != 2" type="text" @click="editor(scope.row)">修改</el-button>
                                <el-button v-if ="scope.row.flag != 2 && scope.row.flag != 1" type="text" @click="del(scope.row)">删除</el-button>
                                <el-button v-if ="scope.row.flag == 1" type="text" @click="$router.push({path:'/home/zhangtao/kemushezhi_create_account',query:{type:type,parent:scope.row.subjects_name,direction:scope.row.direction,parentId:scope.row.subjects_number}})">新增</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogVisible1" width="20%" :show-close="false" :close-on-click-modal="false">
            <el-form :model="add">
                <el-form-item label="科目名称" label-width="100px">
                    <el-input v-model="add.subjectsName" auto-complete="off"></el-input>
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
                editorId:'',
                dialogVisible1:false,
                title:'',
                add:{
                    subjectsName:''
                },
                type:'',
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
            // 修改的确定
            add_ok(){
                this._ajax('userHomePage/updateUserSubjects',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    subjectsName:this.add.subjectsName,
                    idNum:this.editorId
                }, msg => {
                    this._message(1,"修改成功")
                    this.dialogVisible1 = false
                    this.list()
                })
            },
            // 修改
            editor(row){
                this.editorId = row.subjectId
                this.title = "修改" + row.subjects_number
                this.add.subjectsName = row.subjects_name
                this.dialogVisible1 = true
            },
            // 删除
            del(row){
                // console.log(row.subjects_number.substr(0,4))
                this._ajax('userHomePage/deleteUserSubjects',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    parentId:row.subjects_number.substr(0,4),
                    idNum:row.subjectId
                }, msg => {
                    this._message(1,"删除成功")
                    this.list()
                })
            },
            a(){
                this.type = 0
                this.list()
            },
            b(){
                this.type = 1
                this.list()
            },
            c(){
                this.type = 2
                this.list()
            },
            d(){
                this.type = 3
                this.list()
            },
            e(){
                this.type = 4
                this.list()
            },
            list(){
                this._ajax('userHomePage/selectUserSubjects',{
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