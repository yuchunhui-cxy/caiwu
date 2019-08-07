<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">修改固定资产管理</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">
                <div>
                    <el-form
                            :rules="rules"
                            ref="user"
                            label-width="130px"
                            :model="user">
                        <div style="display: flex;justify-content: space-between;margin-top: 5vh">

                            <div style="flex: 1;">
                                <el-form-item label="资产名称：" prop="assetName">
                                    <el-input type="text" placeholder="" class="hj-ipt" v-model="user.assetName"></el-input>
                                </el-form-item>
                                <el-form-item label="开始使用日期：" prop="startDate">
                                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="默认当日日期" v-model="user.startDate"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="资产原值：" prop="zMoeny">
                                    <el-input type="text" placeholder="" class="hj-ipt" v-model="user.zMoeny"></el-input>
                                </el-form-item>
                                <el-form-item label="预计使用月份：" prop="setMonth">
                                    <el-input type="text" placeholder="" class="hj-ipt" v-model="user.setMonth"></el-input>
                                </el-form-item>
                                <el-form-item label="累计折旧：" prop="setZMoney">
                                    <el-input type="text" placeholder="" v-model="user.setZMoney"></el-input>
                                </el-form-item>
                            </div>
                            <div style="flex: 1;margin-left: 2vw">

                                <el-form-item label="资产类别：" prop="assetClassify">
                                    <el-select v-model="user.assetClassify" placeholder="请选择">
                                        <el-option label="1-房屋、建筑物" value="1"></el-option>
                                        <el-option label="2-机器机械生产设备" value="2"></el-option>
                                        <el-option label="3-器具工具家具" value="3"></el-option>
                                        <el-option label="4-运输工具" value="4"></el-option>
                                        <el-option label="5-电子设备" value="5"></el-option>
                                        <el-option label="6-其他固定资产" value="6"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择科目：" prop="subjectId">
                                    <el-select v-model="user.subjectId" placeholder="请选择">
                                        <el-option :key="item.id" :label="item.subjects_name" v-for="item in list" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>

                                <div style="display: flex;justify-content: space-between;">
                                    <div>
                                        <el-form-item label="企业类别：" prop="flag">
                                            <el-select v-model="user.flag" placeholder="请选择">
                                                <el-option label="内资" value="0"></el-option>
                                                <el-option label="外资" value="1"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="已折旧月份：" prop="getMonth">
                                            <el-input disabled type="text" placeholder="" v-model="user.getMonth"></el-input>
                                        </el-form-item>
                                        <el-form-item label="减值准备：" prop="getZMoney">
                                            <el-input type="text" placeholder="" v-model="user.getZMoney"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div>
                                        <el-form-item label="残值率：">
                                            <el-input disabled type="text" placeholder="" v-model="user.residualValue"></el-input>
                                        </el-form-item>
                                        <el-form-item label="剩余使用月份：">
                                            <el-input disabled type="text" placeholder="" v-model="user.endMonth"></el-input>
                                        </el-form-item>
                                        <el-form-item label="每月折旧额：">
                                            <el-input disabled type="text" placeholder="" v-model="user.zheJiu"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <el-form-item>
                            <div  style="text-align: center">
                                <el-button type="warning" @click="submitForm('user')">保存</el-button>
                                <el-button type="info" style="margin-left: 3vw" @click="$router.push({path:'/home/qimojiezhuan/fixed_assets_management'})">返回</el-button>
                            </div>
                        </el-form-item>

                    </el-form>

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
                list:[],
                user:{},
                rules: {   // 表单验条件
                    assetName: [
                        { required: true, message: '请输入资产名称', trigger: 'blur' },
                    ],
                    startDate: [
                        { required: true, message: '请选择开始使用日期', trigger: 'change' },
                    ],
                    zMoeny: [
                        { required: true, message: '请输入资产原值', trigger: 'blur' },
                    ],
                    setMonth: [
                        { required: true, message: '请输入预计使用月份', trigger: 'blur' },
                    ],
                    setZMoney: [
                        { required: true, message: '请输入累计折旧', trigger: 'blur' },
                    ],
                    assetClassify: [
                        { required: true, message: '请选择资产类别', trigger: 'change' },
                    ],
                    subjectId: [
                        { required: true, message: '请选择科目', trigger: 'change' },
                    ],
                    flag: [
                        { required: true, message: '请选择企业类别', trigger: 'change' },
                    ],
                    getMonth: [
                        { required: true, message: '请输入已折旧月份', trigger: 'blur' },
                    ],
                    getZMoney: [
                        { required: true, message: '请输入减值准备', trigger: 'blur' },
                    ],
                }
            }
        },
        mounted(){
            this.getStorage()
            this._ajax('userAccounts/selectSubjectsDictionary1',{
                uuid:this.uuid,
                workAccountID:this.accountId,
                name:'',
                parentId:1601
            }, msg => {
                this.list = msg
                this._message(1,"科目成功")
                this._ajax('userHomePage/selectOldCargoById',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    id:this.$route.query.id
                }, msg => {
                    this.user = msg
                    this.user.residualValue += '%'
                    this.user.subjectId = Number(this.user.subjectId)
                    this._message(1,"反显成功")
                })
            })


        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userHomePage/updateOldCargoById',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,
                            ...this.user,
                            type:this.user.assetClassify,
                            name:this.user.assetName,
                            id:this.$route.query.id
                        }, msg => {
                            this.$router.push("/home/qimojiezhuan/fixed_assets_management")
                            this._message(1,"修改成功")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .has-gutter{
        background: red!important;
    }

</style>