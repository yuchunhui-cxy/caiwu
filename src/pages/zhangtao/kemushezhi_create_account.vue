<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="display: flex;justify-content: center;align-items: center">
                <div style="font-size: 30px;color: #1C2023;">
                    新建账户
                </div>
            </div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh;display: flex;justify-content: center">
                <div style="width: 500px;display: flex;justify-content: center;flex-wrap: wrap">
                    <div style="width: 100%;">
                        <el-form
                                :rules="rules2"
                                ref="user"
                                label-width="100px"
                                :model="user">
                            <el-form-item label="科目编号：" prop="">
                                <el-input disabled type="text" placeholder="" class="hj-ipt" v-model="user.subjectsNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="科目名称：" prop="subjectsName">
                                <el-input type="text" placeholder="" class="hj-ipt" v-model="user.subjectsName"></el-input>
                            </el-form-item>
                            <el-form-item label="上级科目：">
                                <el-input disabled type="text" placeholder="" class="hj-ipt" v-model="user.parent"></el-input>
                            </el-form-item>
                            <div style="width: 100%;display: flex;justify-content: space-between">
                                <el-button type="warning" @click="save('user')">保存</el-button>
                                <el-button type="info" @click="$router.push({path:'/home/zhangtao/kemushezhi'})">返回</el-button>
                            </div>
                        </el-form>
                    </div>

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
                total:100,
                dangqianye:1,
                user:{
                    subjectsNumber:'',
                    subjectsName:'',
                    parent:'',
                },
                rules2: {   // 表单验条件
                    subjectsName:[
                        { required: true,message: "请输入科目名称", trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            this.getStorage()

            this.user.parent = this.$route.query.parent

            this._ajax('userHomePage/selectNumber',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                parentId:this.$route.query.parentId
            }, msg => {
                this.user.subjectsNumber = msg.subjectsNumber
                // this._message(1,"编号成功")
            })
        },
        methods: {

            save(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userHomePage/addUserSubjects',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,
                            ...this.user,
                            flag:this.$route.query.direction,
                            type:this.$route.query.type,
                            parentId:this.$route.query.parentId
                        }, msg => {
                            this._message(1,"添加成功")
                            this.$router.push({path:'/home/zhangtao/kemushezhi'})
                        })

                    } else {
                        return false;
                    }
                });

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