<template>
    <div>
        <div style="background: #FFF;padding: 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">凭证详情</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">

                <div style="display: flex;justify-content: space-between;align-items: flex-start;">

                    <div style="display: flex">
                        <div>
                            凭证字号: 第 12 号
                        </div>
                        <div style="margin-left: 3vw">
                            生成时间: 2019年5月8日
                        </div>

                    </div>

                    <div>
                        <el-button type="warning" @click="$router.push({path: '/home/pingzhengguanli/xinzengfapiao'})">上传票据</el-button>
                        <el-button type="warning" @click="dialogVisible=true">从现有票据选择</el-button>
                    </div>

                </div>
                <el-table
                        :data="tableData"
                        style="width: 100%;margin-top: 2vh">
                    <el-table-column
                            prop="date"
                            label="摘要"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="会计科目"
                            width="150">
                    </el-table-column>

                    <el-table-column label="借方金额">
                        <el-table-column
                                prop="province"
                                label="亿"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="city"
                                label="千"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="百"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="十"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="万"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="千"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="百"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="十"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="元"
                                width="">
                        </el-table-column>
                    </el-table-column>


                    <el-table-column label="借方金额">
                        <el-table-column
                                prop="province"
                                label="亿"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="city"
                                label="千"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="百"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="十"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="万"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="千"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="百"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="十"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="zip"
                                label="元"
                                width="">
                        </el-table-column>
                    </el-table-column>




                </el-table>
                <div>

                </div>
                <div style="display: flex;justify-content: flex-end;margin-top: 1vh">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="dangqianye"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>

                <div style="display: flex;justify-content: center;margin-top: 5vh;">
                    <el-button type="warning" @click="$router.push({path: '/home/pingzhengguanli/editor_pingzheng'})">编辑</el-button>

                    <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})">返回</el-button>


                </div>



            </div>

        </div>
        <el-dialog title="" :visible.sync="dialogVisible">
            <el-table :data="tableData1"  @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column property="1" label="上传时间" width="150"></el-table-column>
                <el-table-column property="2" label="发票号码" width="200"></el-table-column>
                <el-table-column property="3" label="摘要"></el-table-column>
                <el-table-column property="3" label="价税合计"></el-table-column>



            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "xianjinliuliangbiao",
        data() {
            return {
                dialogVisible:false,
                tableData1:[{}],
                yue: "",
                tableData: [
                    {
                        date: '1',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: 111
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: -20
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: 0
                    }],
                total: 100,
                dangqianye: 1,
                multi: '',
                form: {
                    code: '',
                    name: ''
                },
                swit: ''
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                if (rowIndex % 2 != 0) {
                    return 'lan';
                }
                return "";
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.multi = val;
                console.log(this.multi)
            },
            handleClick(row) {
                console.log(row);
                this.$router.push({path: "/home/manage/detail"})

            },
            delClick(row) {
                console.log(row)
            },
            // 添加人员
            add() {
                // this.$router.push({path: "/home/manage/add_set"})
            },
            // 五险一金设置
            set() {
                this.$router.push({path: "/home/manage/set"})

            },
            // 编辑
            editor() {
                // this.$router.push({path: "/home/manage/add_set"})
            }
        },
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68, 160, 255, 0.05);
    }

    .has-gutter {
        background: red !important;
    }

</style>