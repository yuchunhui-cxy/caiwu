<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">员工详情</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">

                <div style="display: flex">
                    <div style="flex: 1;">
                        <div class="r">
                            编号:
                        </div>
                        <div class="r">
                            身份证号:
                        </div>
                        <div class="r">
                            工资卡号:
                        </div>
                        <div class="r">
                            部门:
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                            {{workerNumber}}
                        </div>
                        <div class="l">
                            {{workerCard}}
                        </div>
                        <div class="l" v-if="workerSalaryCard == ''">
                            &nbsp;
                        </div>
                        <div class="l" v-if="workerSalaryCard != ''">
                            {{workerSalaryCard}}
                        </div>
                        <div class="l">
                            {{workerJob}}
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="r">
                            姓名:
                        </div>
                        <div class="r">
                            学历:
                        </div>
                        <div class="r">
                            开户行:
                        </div>
                        <div class="r">
                            岗位:
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                            {{workerName}}
                        </div>
                        <div class="l">
                            {{workerEducation}}
                        </div>
                        <div class="l">
                            {{workerOpenAccount}}
                        </div>
                        <div class="l">
                            {{workerPost}}
                        </div>
                    </div>


                    <div style="flex: 1;">
                        <div class="r">
                            性别:
                        </div>
                        <div class="r">
                            手机号:
                        </div>
                        <div class="r">
                            入职日期:
                        </div>
                        <div class="r">
                            工资始发日期:
                        </div>
                    </div>

                    <div style="flex: 1;">
                        <div class="l">
                            {{workerSex}}
                        </div>
                        <div class="l" v-if="workerPhone == ''">
                            &nbsp;
                        </div>
                        <div class="l" v-if="workerPhone != ''">
                            {{workerPhone}}
                        </div>
                        <div class="l">
                            {{workerEntryDate}}
                        </div>
                        <div class="l">
                            {{workerStartDate}}
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div style="flex: 1;">
                        <div class="r">
                            计提工资科目:
                        </div>
                    </div>
                    <div style="flex: 3;">
                        <div class="l">
                            {{workerSalarySubject}}
                        </div>
                    </div>

                    <div style="flex: 1;">
                        <div class="r">
                            员工状态:
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                            {{workerStatus}}
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div style="flex: 1;">
                        <div class="r">
                            备注:
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                            {{remarks}}
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="r">
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="r">
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div style="flex: 1;">
                        <div class="r">
                            税前工资:
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                            {{workerTaxSalary}}
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="r">
                            五险一金缴纳基数:
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                            {{workerPayBase}}
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="r">
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="l">
                        </div>
                    </div>
                </div>

                <div style="display: flex;justify-content: center;margin-top: 5vh">
                    <el-button type="info" @click="$router.push({path:'/home/wuxianyijin/wuxianyijin'})">取消</el-button>

                </div>




            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "xianjinliuliangbiao",
        data() {
            return {
                "workerNumber": "",
                "workerStartDate": "",
                "workerEducation": "",
                "workerPhone": "",
                "workerPayBase": "",
                "workerOpenAccount": "",
                "workerPost": "",
                "workerSalaryCard": "",
                "workerEntryDate": "",
                "workerStatus": "",
                "workerJob": "",
                "workerSalarySubject": "",
                "workerTaxSalary":"",
                "workerName": "",
                "workerCard": "",
                "remarks": "",
                workerSex:''
            }
        },
        mounted(){
            this._ajax('weChatWork/getWorker',{
               id:this.$route.query.id
            }, msg => {
                    this.workerNumber = msg.workerNumber
                        this.workerStartDate = msg.workerStartDate
                        if(msg.workerEducation === 0){
                            this.workerEducation = '高中及以下'
                        } else if(msg.workerEducation == 1){
                            this.workerEducation = '大专'
                        } else if(msg.workerEducation == 2){
                            this.workerEducation = '本科'
                        } else if(msg.workerEducation == 3){
                            this.workerEducation = '硕士'
                        } else if(msg.workerEducation == 4){
                            this.workerEducation = '硕士以上'
                        }

                        this.workerPhone = msg.workerPhone
                        this.workerPayBase = msg.workerPayBase
                        this.workerOpenAccount = msg.workerOpenAccount
                        this.workerPost = msg.workerPost
                        this.workerSalaryCard = msg.workerSalaryCard
                        this.workerEntryDate = msg.workerEntryDate
                        this.workerJob = msg.workerJob
                        if(this.workerSalarySubject == 0){
                            this.workerSalarySubject = '销售费用'
                        }else if(this.workerSalarySubject == 1){
                            this.workerSalarySubject = '管理费用'

                        }else if(this.workerSalarySubject == 2){
                            this.workerSalarySubject = '研发费用'
                        }

                        this.workerTaxSalary = msg.workerTaxSalary
                        this.workerName = msg.workerName
                        this.workerCard = msg.workerCard
                        this.remarks = msg.remarks
                        this.workerSex = msg.workerSex
                        if(this.workerStatus == 0){
                            this.workerStatus = '在职'
                        }else if(this.workerStatus == 1){
                            this.workerStatus = '离职'

                        }

                        // this._message(1,"加载成功")
            })

        },
        methods: {
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    if(columnIndex == 1 || columnIndex == 2 || columnIndex == 3){
                        return [0, 0];
                    }
                    return [1, 4];
                }
            },

            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 != 0) {
                    return 'lan';
                }
                return "";
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
    }
</script>

<style>


    .r{
        width: 100%;
        text-align: right;
        margin-top: 3vh;
    }
    .l{
        width: 100%;
        text-align: left;
        margin-top: 3vh;
        margin-left: 1vw;
    }

</style>