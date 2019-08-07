<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">五险一金设置</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div>
                    <el-form ref="form" :model="form">
                        <el-form-item label="地区:">
                            <el-select v-model="form.location" placeholder="请选择地区">
                                <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in area_list"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>

                <div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="name"
                                label="缴纳项目"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="company"
                                label="公司缴纳比例">
                        </el-table-column>
                        <el-table-column
                                prop="person"
                                label="个人缴纳比例">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="wuxianyijin_set(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div style="display: flex;justify-content: center;margin-top: 2vh">
                    <el-button type="warning" @click="save">保存</el-button>
                    <el-button type="info" style="margin-left: 10vw" @click="$router.push({path:'/home/wuxianyijin/wuxianyijin'})">取消</el-button>
                </div>
            </div>
        </div>

        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="20%" :show-close="false" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="公司缴纳比例" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="form.company" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        %
                    </el-col>
                </el-form-item>
                <el-form-item label="个人缴纳比例" label-width="100px">
                    <el-col :span="20">
                        <el-input v-model="form.person" auto-complete="off"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        %
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ok_cancel">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
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
                form:{
                    location:'',
                    company:'',
                    person:''
                },
                area_list:[],
                tableData: [],
                total:0,
                dangqianye:1,
                pageSize:10,
                dialogFormVisible:false,
                title:''
            }
        },
        mounted(){
            this.getStorage()

            this._ajax('userLogin/province',{

            }, msg => {
                this.area_list = msg
                // this._message(1,"地区成功")

                this._ajax('userCompany/selectInsurance',{
                    uuid:this.uuid,accountId:this.accountId
                }, msg => {
                    this.tableData.push({name:'养老保险金',company:msg.old_work,person:msg.old_user})
                    this.tableData.push({name:'医疗保险金',company:msg.medical_work,person:msg.medical_user})
                    this.tableData.push({name:'失业保险金',company:msg.nojob_work,person:msg.nojob_user})
                    this.tableData.push({name:'工伤保险金',company:msg.over_work,person:msg.over_user})
                    this.tableData.push({name:'生育保险金',company:msg.make_work,person:msg.make_user})
                    this.tableData.push({name:'住房公积金',company:msg.home_work,person:msg.home_user})

                    this.form.location = msg.area

                    // this._message(1,"tableData成功")
                })

            })


        },
        methods: {
            // 弹框的确定
            ok(){
                let index= this.tableData.findIndex(item=>{
                    return item.name ==  this.title
                })
                this.tableData[index].company = this.form.company+'%'
                this.tableData[index].person = this.form.person+'%'
                this.form.company = ''
                this.form.person = ''
                this.dialogFormVisible = false
            },
            // 弹框的取消
            ok_cancel(){
                this.form.company = ''
                this.form.person = ''
                this.dialogFormVisible = false
            },
            // 修改
            wuxianyijin_set(row){
                this.title = row.name
                this.form.company = row.company.split('%')[0]
                this.form.person = row.person.split('%')[0]
                this.dialogFormVisible = true
            },
            // 保存
            save(){
                const params = {
                    "oldUser": this.tableData[0].person,
                    "oldWork": this.tableData[0].company,
                    "medicalUser": this.tableData[1].person,
                    "medicalWork": this.tableData[1].company,
                    "nojobUser": this.tableData[2].person,
                    "nojobWork": this.tableData[2].company,
                    "makeUser": this.tableData[4].person,
                    "makeWork": this.tableData[4].company,
                    "overUser": this.tableData[3].person,
                    "overWork": this.tableData[3].company,
                    "homeUser": this.tableData[5].person,
                    "homeWork": this.tableData[5].company,
                    "area": this.form.location
                }

                this._ajax('userCompany/updateInsurance',{
                    ...params,uuid:this.uuid,accountId:this.accountId
                }, msg => {

                    this._message(1,"修改成功")
                    this.$router.push({path:"/home/wuxianyijin/wuxianyijin"})

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