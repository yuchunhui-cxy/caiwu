<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="display: flex;justify-content: center;align-items: center">
                <div style="font-size: 30px;color: #1C2023;">
                    {{title}}
                </div>
            </div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh;display: flex; justify-content: center">
                <div style="width: 500px;display: flex;justify-content: center;flex-wrap: wrap">
                    <div style="width: 100%;">
                        <el-form
                                :rules="rules"
                                ref="user"
                                label-width="100px"
                                :model="user">
                            <!--<el-form-item label="编号：" prop="" v-if="title=='编辑账户'">-->
                                <!--<el-input type="text" placeholder="" class="hj-ipt" v-model="user.number"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item label="名称：" prop="name">
                                <el-input type="text" placeholder="示例：中国银行" class="hj-ipt" v-model="user.name"></el-input>
                            </el-form-item>
                            <el-form-item label="银行账号：" prop="bankCode">
                                <el-input type="text" placeholder="" class="hj-ipt" v-model="user.bankCode"></el-input>
                            </el-form-item>
                            <el-form-item label="币别：" prop="moneyType">
                                <el-select v-model="user.moneyType" placeholder="请选择">
                                    <el-option :label="item.name" :value="item.name" v-for="item in list" :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="会计科目：" prop="accountingSubject">
                                <el-input type="text" placeholder="" v-model="user.accountingSubject"></el-input>
                            </el-form-item>

                            <div style="width: 100%;display: flex;justify-content: space-between">
                                <el-button type="warning" @click="submitForm('user')">保存</el-button>
                                <el-button type="info" @click="$router.push({path:'/home/zhangtao/zhanghushezhi'})">返回</el-button>
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
                list:[],
                title:"",
                user:{
                    // number:'',
                    name:'',
                    bankCode:"",
                    moneyType:'',
                    accountingSubject:''
                },
                rules: {   // 表单验条件
                    name:[
                        { required: true,message: "请输入名称", trigger: 'blue' }
                    ],
                    bankCode:[
                        { required: true,message: '请输入银行账号', trigger: 'blur' }
                    ],
                    moneyType:[
                        { required: true,message: '请选择币别', trigger: 'change' }
                    ],
                    accountingSubject:[
                        { required: true,message: '请输入会计科目', trigger: 'blur' }
                    ]
                },
                // 修改接口只要改了的
                n:'',
                b:'',
                m:'',
                a:'',
            }
        },
        mounted(){
            this.getStorage()

            this._ajax('common/selectMoneyType',{
            }, msg => {
                this.list = msg
                // this._message(1,"币种成功")
            })

            if(this.$route.query.type == "add"){
                this.title = "新建账户"
            }else{
                this.title = "编辑账户"
                this._ajax('userHomePage/selectUserBankCode', {
                    uuid:this.uuid,
                    accountId:this.accountId,
                    bankCodeId:this.$route.query.id,
                }, msg => {
                    this.user.name = msg.name
                    this.user.bankCode = msg.bank_code
                    this.user.moneyType = msg.money_type
                    this.user.accountingSubject = msg.accounting_subject
                    // this.user.number = msg.number
                    // 修改接口只要改了的
                    this.n = msg.name
                    this.b = msg.bank_code
                    this.m = msg.money_type
                    this.a = msg.accounting_subject

                    // this._message(1,"返显成功")
                })
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.title=="新建账户"){
                            this._ajax('userHomePage/addUserBankCode', {
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                ...this.user
                            }, msg => {
                                this._message(1,"添加成功")
                                this.$router.push({path:"/home/zhangtao/zhanghushezhi"})
                            })
                        }else{
                            // 如果都没修改点击保存
                            if(this.n == this.user.name && this.b == this.user.bankCode && this.m == this.user.moneyType && this.a == this.user.accountingSubject){
                                this.$router.push({path:"/home/zhangtao/zhanghushezhi"})
                                return
                            }
                            const l = {}
                            if(this.n != this.user.name){
                                l.name = this.user.name
                            }
                            if(this.b != this.user.bankCode){
                                l.bankCode = this.user.bankCode
                            }
                            if(this.m != this.user.moneyType){
                                l.moneyType = this.user.moneyType
                            }
                            if(this.a != this.user.accountingSubject){
                                l.accountingSubject = this.user.accountingSubject
                            }
                            this._ajax('userHomePage/updateUserBankCode', {
                                uuid:this.uuid,
                                accointId:this.accountId,
                                bankCodeId:this.$route.query.id,
                                ...l
                            }, msg => {
                                this._message(1,"修改成功")
                                this.$router.push({path:"/home/zhangtao/zhanghushezhi"})
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
</style>