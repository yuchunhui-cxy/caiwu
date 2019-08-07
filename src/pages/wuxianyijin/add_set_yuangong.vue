<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">{{title}}</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">

                <el-form ref="form" :model="form" label-width="150px" :rules="rules">
                    <div style="display: flex;flex-wrap: wrap">
                        <div style="width: 400px;">
                            <el-form-item label="编号：" prop="number">
                                <el-input v-model="form.number" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="姓名：" prop="workerName">
                                <el-input v-model="form.workerName" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;" v-if="title == '添加员工'">
                            <el-form-item label="性别：">
                                <el-select v-model="form.sex" placeholder="" style="width: 100%;">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="身份证号：">
                                <el-input v-model="form.card" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="学历：">
                                <el-select v-model="form.workerEducation" placeholder="" style="width: 100%;">
                                    <el-option label="高中及以下" value="0"></el-option>
                                    <el-option label="大专" value="1"></el-option>
                                    <el-option label="本科" value="2"></el-option>
                                    <el-option label="硕士" value="3"></el-option>
                                    <el-option label="硕士以上" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="手机号：">
                                <el-input v-model="form.workerPhone" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="工资卡号：">
                                <el-input v-model="form.workerSalaryCard" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="开户行：">
                                <el-input v-model="form.workerOpenAccount" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="入职日期：" prop="add_job_date">
                                <el-date-picker style="width: 100%;" type="date" placeholder="默认当前日期" v-model="form.workerEntryDate" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="部门：">
                                <el-input v-model="form.workerJob" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="岗位：">
                                <el-input v-model="form.workerPost" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="工资始发日期：" prop="workerStartDate">
                                <el-date-picker style="width: 100%;" type="date" placeholder="默认当前日期" v-model="form.workerStartDate" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="width: 800px;position: relative">
                            <el-form-item label="计提工资科目：" prop="workerSalarySubject">
                                <el-select v-model="form.workerSalarySubject" placeholder="请选择" style="width: 100%">
                                    <el-option label="销售费用" value="0"></el-option>
                                    <el-option label="管理费用" value="1"></el-option>
                                    <el-option label="研发费用" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <div style="position: absolute;bottom: -20px;margin-left: 150px;font-size: 14px;color: #8F97A4;">根据科目不同，员工工资将统计在不同的支出分类中</div>
                        </div>
                        <div style="width: 100%;height: 25px;"></div>
                        <div style="width: 400px;">
                            <el-form-item label="员工状态：" prop="workerStatus">
                                <el-select v-model="form.workerStatus" placeholder="请选择" style="width: 100%;">
                                    <el-option label="在职" value="0"></el-option>
                                    <el-option label="离职" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 800px;">
                            <el-form-item label="备注：">
                                <el-input v-model="form.remarks" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="税前工资：" prop="workerTaxSalary">
                                <el-input v-model="form.workerTaxSalary" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 400px;">
                            <el-form-item label="五险一金缴纳基数：" prop="workerPayBase">
                                <el-input v-model="form.workerPayBase" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>

                <div style="display: flex;justify-content: center;margin-top: 5vh;">
                    <el-button type="warning"  @click="submitForm('form')">保存</el-button>
                    <el-button type="info" style="margin-left: 5vw" @click="$router.push({path:'/home/wuxianyijin/wuxianyijin'})">取消</el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        mixins:[mix],
        name: "xianjinliuliangbiao",
        data() {
            return {
                date:new Date(),
                form:{
                    "number": "",
                    "workerName": "",
                    "card": "",
                    "workerEducation": "",
                    "workerPhone": "",
                    "workerSalaryCard": "",
                    "workerOpenAccount": "",
                    "workerEntryDate": '',
                    "workerStartDate": '',
                    "workerJob": "",
                    "workerPost": "",
                    "workerSalarySubject": "",
                    "remarks": "",
                    "workerStatus": "",
                    "workerTaxSalary": "",
                    "workerPayBase": "",
                    sex:''
                },
                rules: {
                    number: [
                        { required: true, message: '请输入编号', trigger: 'blue' },
                    ],
                    workerName: [
                        { required: true, message: '请输入姓名', trigger: 'blue' },
                    ],
                    workerEntryDate: [
                        { required: true, message: '请选择入职日期', trigger: 'change' },
                    ],
                    workerStartDate: [
                        { required: true, message: '请选择工资始发日期', trigger: 'change' },
                    ],
                    workerSalarySubject: [
                        { required: true, message: '请选择计提工资科目', trigger: 'change' },
                    ],
                    workerStatus: [
                        { required: true, message: '请选择员工状态', trigger: 'change' },
                    ],
                    workerTaxSalary: [
                        { required: true, message: '请输入税前工资', trigger: 'blue' },
                    ],
                    workerPayBase: [
                        { required: true, message: '请输入五险一金缴纳基数', trigger: 'blue' },
                    ],
                },
                title:''
            }
        },
        mounted(){
            this.getStorage()

            // const date = new Date()
            // let y = date.getFullYear()
            // let m = date.getMonth()+1
            // let d = date.getDate()
            this.form.workerEntryDate = new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + (Number(new Date().getDate()))).slice(-2)
            this.form.workerStartDate = new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + (Number(new Date().getDate()))).slice(-2)

            if(this.$route.query.type == "add"){
                this.title = "添加员工"
            }else{
                this.title = "修改员工"

                this._ajax('weChatWork/getWorker',{
                    id:this.$route.query.id
                }, msg => {
                    this.form.number = msg.workerNumber
                    this.form.workerStartDate = msg.workerStartDate
                    this.form.workerEducation = msg.workerEducation
                    this.form.workerPhone = msg.workerPhone
                    this.form.workerPayBase = msg.workerPayBase
                    this.form.workerOpenAccount = msg.workerOpenAccount
                    this.form.workerPost = msg.workerPost
                    this.form.workerSalaryCard = msg.workerSalaryCard
                    this.form.workerEntryDate = msg.workerEntryDate
                    this.form.workerJob = msg.workerJob
                    this.form.workerSalarySubject = msg.workerSalarySubject
                    this.form.workerTaxSalary = msg.workerTaxSalary
                    this.form.workerName = msg.workerName
                    this.form.card = msg.workerCard
                    this.form.remarks = msg.remarks
                    this.form.sex = msg.workerSex
                    this.form.workerStatus = msg.workerStatus

                    // this._message(1,"返显成功")
                })
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.title == "添加员工"){
                            this._ajax('weChatWork/add',{uuid:this.uuid,accountId:this.accountId,...this.form}, msg => {
                                this._message(1,"添加成功")
                                this.$router.push({path:'/home/wuxianyijin/wuxianyijin'})
                            })
                        }else{
                            this._ajax('weChatWork/updateWorker',{uuid:this.uuid,accountId:this.accountId,...this.form,id:this.$route.query.id}, msg => {
                                this._message(1,"修改成功")
                                this.$router.push({path:'/home/wuxianyijin/wuxianyijin'})
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    }
</script>

<style>

</style>