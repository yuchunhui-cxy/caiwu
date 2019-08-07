<template>
    <div>
        <div style="background: #FFF;padding: 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">添加凭证</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 2vw;margin-top: 2vh">

                <div style="display: flex;">

                    <div style="width: 60%;">
                        <el-form label-width="100px" ref="form" :model="form" :rules="rules">
                            <div style="display: flex;flex-wrap: wrap">
                                <div style="width: 40%;">
                                    <el-form-item label="方向：" prop="direction">
                                        <el-select @change="change_fangxiang" v-model="form.direction" placeholder="请选择" style="width: 100%;">
                                            <el-option label="收" value="0"></el-option>
                                            <el-option label="支" value="1"></el-option>
                                            <el-option label="转账" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div style="width: 25%;">
                                    <el-form-item label="分类：" prop="one1">
                                        <!--<el-col :span="11">-->
                                            <el-select filterable @change="change_one" v-model="form.one1" placeholder="请先选择方向" style="width: 100%;">
                                                <el-option :key="item.id" v-for="item in one" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        <!--</el-col>-->
                                        <!--<el-col :span="11" :offset="2">-->
                                            <!--<el-select filterable @change="change_two" v-model="form.classify" placeholder="请先选择一级分类" style="width: 100%;">-->
                                                <!--<el-option :key="item.id" v-for="item in two" :label="item.name" :value="item.name+'-'+item.code+'-'+item.id"></el-option>-->
                                            <!--</el-select>-->
                                        <!--</el-col>-->
                                    </el-form-item>

                                </div>
                                <div style="width: 25%;">
                                    <el-form-item label=" ">
                                        <!--<el-col :span="11">-->
                                        <!--<el-select filterable @change="change_one" v-model="form.one1" placeholder="请先选择方向" style="width: 100%;">-->
                                            <!--<el-option :key="item.id" v-for="item in one" :label="item.name" :value="item.id"></el-option>-->
                                        <!--</el-select>-->
                                        <!--</el-col>-->
                                        <!--<el-col :span="11" :offset="2">-->
                                        <el-select filterable @change="change_two" v-model="form.classify" placeholder="请先选择一级分类" style="width: 100%;">
                                        <el-option :key="item.id" v-for="item in two" :label="item.name" :value="item.name+'-'+item.code+'-'+item.id"></el-option>
                                        </el-select>
                                        <!--</el-col>-->
                                    </el-form-item>

                                </div>
                                <div style="width: 60%;">
                                    <el-form-item label="交易方式：" prop="payMoney">
                                        <el-select v-model="form.payMoney" placeholder="请选择" style="width: 100%;">
                                            <el-option label="银行转账" value="0"></el-option>
                                            <el-option label="现金支付" value="1"></el-option>
                                            <el-option label="微信（公司账号）" value="2"></el-option>
                                            <el-option label="微信（法人个人账号）" value="3"></el-option>
                                            <el-option label="支付宝（公司账号）" value="4"></el-option>
                                            <el-option label="支付宝（法人个人账号）" value="5"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>

                                <div style="width: 30%;">
                                    <el-form-item label="支付状态" label-width="100px" prop="type">
                                        <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
                                            <el-option label="已付" value="1"></el-option>
                                            <el-option label="未付" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>

                                <div style="width: 30%;">
                                    <el-form-item label="凭证字号：" prop="code">

                                        <el-form-item label="第" prop="code" label-width="20px">
                                            <el-input v-model="form.code" style="width: 100%;"></el-input>
                                        </el-form-item>
                                    </el-form-item>


                                </div>
                                <div style="width: 1%;">
                                    <el-form-item label="号" prop="" label-width="30px">
                                    </el-form-item>

                                </div>

                                <div style="width: 20%;">
                                    <el-form-item label="日期：" prop="">
                                        <el-date-picker
                                                style="margin-left: 20px"
                                                value-format="yyyy-MM-dd"
                                                v-model="form.accountsDate"
                                                type="date"
                                                placeholder="选择月">
                                        </el-date-picker>
                                    </el-form-item>

                                </div>




                            </div>



                        </el-form>
                    </div>

                    <div style="width: 40%;display: flex;justify-content: flex-end;align-items: flex-start
">
                        <el-button type="warning" @click="btn_shengchengpingzheng">生成凭证</el-button>
                    </div>

                </div>
                <el-form :model="user" ref="user">
                <el-table
                        v-if="shengchengpingzheng"
                        :data="user.tableData"
                        style="width: 100%">
                    <el-table-column
                            prop=""
                            label="科目"
                            width="180">
                        <!--<template slot-scope="scope">-->
                            <!--<el-select filterable v-model="scope.row.name" placeholder="请选择" style="width: 100%;">-->
                                <!--<el-option :key="item.id" v-for="item in list" :label="item.subjects_name" :value="item.subjects_name+'-'+item.subjects_number"></el-option>-->
                            <!--</el-select>-->
                        <!--</template>-->
                        <template slot-scope="scope">
                            <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.name'" :rules="[{ required: true, message: '请输入科目', trigger: 'change' }]">
                                <el-select filterable v-model="scope.row.name" placeholder="请选择" style="width: 100%;">
                                    <el-option :key="item.id" v-for="(item,index) in list" :label="item.subjects_name" :value="item.subjects_name+'-'+item.subjects_number"></el-option>
                                </el-select>
                            </el-form-item>
                        </template>

                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="摘要"
                            width="180">
                        <template slot-scope="scope">
                            <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.zhaiyao'" :rules="[{ required: true, message: '请输入摘要', trigger: 'blur' }]">
                                <el-input v-model="scope.row.zhaiyao" placeholder=""></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="借方金额">
                        <template slot-scope="scope">
                            <el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie" placeholder=""></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="贷方金额">
                        <template slot-scope="scope">
                            <el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai" placeholder=""></el-input>
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--fixed="right"-->
                            <!--label="操作"-->
                            <!--width="150">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button @click="add" type="text" size="small">增加</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                </el-form>



                <!--<div style="display: flex;justify-content: flex-end;margin-top: 1vh">-->
                    <!--<el-pagination-->
                            <!--@size-change="handleSizeChange"-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page="dangqianye"-->
                            <!--:page-sizes="[10, 20, 30, 40]"-->
                            <!--:page-size="100"-->
                            <!--layout="total, sizes, prev, pager, next, jumper"-->
                            <!--:total="total">-->
                    <!--</el-pagination>-->
                <!--</div>-->

                <div style="margin-top: 2vh">
                    <el-checkbox v-model="checked">同时生成流水</el-checkbox>
                </div>
                <div style="display: flex;justify-content: center;margin-top: 5vh;">

                    <el-button type="warning" @click="save">保存</el-button>

                    <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/pingzhengguanli/xinzengfapiao',query:{'from':'fapiaoguanli'}})">返回</el-button>

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
                // 是否点击了生成凭证
                shengchengpingzheng:false,
                // 第一分类的列表
                one:[],
                // 第二分类的列表
                two:[],
                form: {
                    // 后台要的俩个参数
                    subjectId:'',
                    parentId:'',
                    // 方向
                    direction: '',
                    // 俩个分类
                    one1:'',
                    classify: '',
                    // 交易方式
                    payMoney:'',
                    // 支付状态
                    type:'',
                    // 凭证字号
                    code:'',
                    // 日期

                    accountsDate:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date().getDate()).slice(-2),
                },
                user:{
                    tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:2},],
                },

                index:0,
                list:[],
                checked:false,
                rules: {
                    accountsDate: [
                        { required: true, message: '请选择日期', trigger: 'change' },
                    ],
                    direction: [
                        { required: true, message: '请选择方向', trigger: 'change' },
                    ],
                    one1: [
                        { required: true, message: '请选择分类一', trigger: 'blur' },
                    ],
                    classify: [
                        { required: true, message: '请选择分类二', trigger: 'change' },
                    ],
                    money: [
                        { required: true, message: '请输入金额', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择支付方式', trigger: 'change' },
                    ],
                    comment: [
                        { required: true, message: '请输入描述', trigger: 'blur' },
                    ],
                    payMoney: [
                        { required: true, message: '请选择交易方式', trigger: 'change' },
                    ],
                },
            }

        },
        mounted(){
            this.getStorage()

            this.pingzhengzihao()

            this._ajax('userAccounts/selectClassName',{
            }, msg => {
                this.list = msg
                // this._message(1,"会计科目成功")
            })
            if(this.$route.query.checked == "false"){
                this.checked = false
            }else{
                this.checked = true
            }
        },
        methods: {
            pingzhengzihao(){
                this._ajax('userHomePage/selectCertificateNumber',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    time:this.form.accountsDate,
                }, msg => {
                    this.form.code = msg.number
                    // this._message(1,"凭证字号成功")
                })
            },
            btn_shengchengpingzheng(){
                this.user.tableData =  [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                    {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1},
                    {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:2},]
                // 有第二个分类的必选第二分类
                if(this.two.length != 0 && this.form.classify == ""){
                    this._message(2,"有二级分类必须选择二级分类")
                    return
                }
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 第一行的科目为分类
                        this.user.tableData[0].name = this.form.classify.split("-")[0]
                        // 第一行的金额和第二行相反
                        if(this.form.direction == 0){
                            this.user.tableData[0].dai_show = true
                            this.user.tableData[0].jie = JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).priceTaxTotal
                        }else if(this.form.direction == 1){
                            this.user.tableData[0].jie_show = true
                            this.user.tableData[0].dai = JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).priceTaxTotal
                        }

                        // 第二行(已付的情况下)由交易方式决定
                        if(this.form.type == 1){
                            if(this.form.payMoney == 0){
                                this.user.tableData[1].name = "银行转账-100201"

                            }else if(this.form.payMoney == 1){
                                this.user.tableData[1].name = "库存现金-1001"

                            }else if(this.form.payMoney == 2){
                                this.user.tableData[1].name = "微信公司账户-100203"

                            }else if(this.form.payMoney == 3){
                                this.user.tableData[1].name = "微信法人账户-101202"

                            }else if(this.form.payMoney == 4){
                                this.user.tableData[1].name = "支付宝公司账户-100202"

                            }else if(this.form.payMoney == 5){
                                this.user.tableData[1].name = "支付宝法人账户-101201"
                            }
                            // (未付的情况下)由收支决定
                        }else if(this.form.type == 0){
                            if(this.form.direction == 0){
                                this.user.tableData[1].name = "应收账款-112201"
                            }else if(this.form.direction == 1){
                                this.user.tableData[1].name = "应付账款-2202"
                            }
                        }
                        // 第二行的金额
                        // 収(0)贷       ,支(1)借
                        if(this.form.direction == 0){
                            this.user.tableData[1].jie_show = true
                            this.user.tableData[1].dai = JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).money
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].dai_show = true
                            this.user.tableData[1].jie = JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).money
                        }

                        // 第三行:収(0)销项是贷,支(1)进项是借
                        if(this.form.direction == 1){
                            this.user.tableData[2].name = "进项税额-22210101"
                            this.user.tableData[2].dai_show = true
                            this.user.tableData[2].jie = Number(JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).priceTaxTotal - ((JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).money))).toFixed(2)
                        }else if(this.form.direction == 0){
                            this.user.tableData[2].name = "销项税额-22210106"
                            this.user.tableData[2].jie_show = true
                            this.user.tableData[2].dai = Number(JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).priceTaxTotal- ((JSON.parse(sessionStorage.getItem("tianjiafapiao_data")).money))).toFixed(2)
                        }
                        this.shengchengpingzheng = true

                    }else{
                        this._message(2,"请先将信息填写完整")
                        // this.form.checked = false
                        return false;
                    }
                })

            },
            jie_change(e){
                let index = this.user.tableData.findIndex(item=>{
                    return item.index == e.index
                })
                let x = false
                for(let i in e.jie){
                    if(e.jie[i] != "" && i!="dian"){
                        x = true
                        break
                    }
                }
                if(x){
                    this.user.tableData[index].dai_show = true
                }else{
                    this.user.tableData[index].dai_show = false
                    this.user.tableData[index].jie_show = false
                }
            },
            dai_change(e){
                let index = this.user.tableData.findIndex(item=>{
                    return item.index == e.index
                })
                let x = false
                for(let i in e.dai){
                    if(e.dai[i] != "" && i!="dian"){
                        x = true
                        break
                    }
                }
                if(x){
                    this.user.tableData[index].jie_show = true
                }else{
                    this.user.tableData[index].dai_show = false
                    this.user.tableData[index].jie_show = false
                }
            },
            add(){
                this.index+=1
                this.user.tableData.push({name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:this.index})
            },
            // 选择方向后
            change_fangxiang(a){
                this._ajax('userAccounts/selectSubjectsDictionary',{
                    uuid:this.uuid,
                    accountId:this.accountId,
                    name:'',
                    flag:this.form.direction
                }, msg => {
                    this.one = msg
                    // this._message(1,"一级分类成功")
                })
            },
            // 选择二级分类后
            change_two(a){
                this.form.subjectId = a.split("-")[2]
            },
            // 选择一级后
            change_one(a){
                this.form.subjectId = a
                this._ajax('userAccounts/selectSubjects2Dictionary',{
                    uuid:this.uuid,
                    accountId:this.accountId,
                    id:a,
                    flag:this.form.direction,
                    name:''
                }, msg => {
                    this.two = msg
                    this.form.parentId = msg[0].parent_id
                    // this._message(1,"二级分类成功")
                })
            },


            save(){
                if(isNaN(Number(this.form.code)) || Number(this.form.code) <=0){
                    this._message(2,"凭证字号格式不正确")
                    return
                }

                if(!this.shengchengpingzheng){
                    this._message(2,"请生成凭证")
                    return
                }

                // 判断信息是否填写完整
                let jie_num = 0
                let dai_num = 0

                let error = false
                this.user.tableData.forEach(item=>{
                    if(item.jie == "" && item.dai ==""){
                        error = true
                        return
                    }
                    // jie_num += item.jie
                    // dai_num += item.dai
                    if(item.jie != ""){
                        jie_num += Number(item.jie)
                    }
                    if(item.dai != ""){
                        dai_num += Number(item.dai)
                    }
                })

                if(error){
                    this._message(2,"请将信息填写完整")
                    return
                }


                this.$refs["user"].validate((valid) => {
                    if (valid) {
                        // 判断是否借贷平衡
                        if(jie_num != dai_num){
                            this._message(2,"借贷不平衡")
                            return
                        }
                        let certificateAbstract = ''
                        let totalDebitMoney = ''
                        let totalCreditMoney = ''
                        let accountantSubject = ''
                        let accountantCode = ''

                        // 如果点击了生成凭证才执行
                        if(this.shengchengpingzheng){
                            this.user.tableData.forEach(item=>{
                                certificateAbstract += item.zhaiyao + ','

                                if(item.jie == ''){
                                    totalDebitMoney+= 0+','
                                }else{
                                    totalDebitMoney+= item.jie+','
                                }

                                if(item.dai == ''){
                                    totalCreditMoney+= 0+','
                                }else{
                                    totalCreditMoney+= item.dai+','
                                }
                                accountantSubject += item.name.split('-')[0]+','
                                accountantCode += item.name.split('-')[1]+','
                            })
                        }

                        this.form.classify = this.form.classify.split('-')[0]

                        // 如果添加流水和凭证
                        if(this.checked){
                            this._ajax('userAccounts/addFlowingWaterInvoiceCertificate',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                certificateAbstract,
                                totalDebitMoney,
                                totalCreditMoney,
                                accountantSubject,
                                accountantCode,
                                ...this.form,

                                time:this.form.accountsDate,
                                certificateNumber:this.form.code,

                                ...JSON.parse(sessionStorage.getItem("tianjiafapiao_data")),
                                type1:0
                            }, msg => {
                                this._message(1,"保存成功")
                                sessionStorage.removeItem('tianjiafapiao_data');
                                this.$router.push({path:"/home/fapiao/fapiaoguanli"})

                            })
                            // 如果不添加流水
                        }else{
                            this._ajax('userAccounts/addCertificateInvoice',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                certificateAbstract,
                                totalDebitMoney,
                                totalCreditMoney,
                                accountantSubject,
                                accountantCode,

                                time:this.form.accountsDate,
                                certificateNumber:this.form.code,
                                ...JSON.parse(sessionStorage.getItem("tianjiafapiao_data")),
                                type1:0
                            }, msg => {
                                this._message(1,"保存成功")
                                sessionStorage.removeItem('tianjiafapiao_data');
                                this.$router.push({path:"/home/fapiao/fapiaoguanli"})

                            })
                        }



                    }else{
                       return false
                    }
                })


                // this.$router.push({path: '/home/pingzhengguanli/xinzengfapiao',query:{'from':'fapiaoguanli'}})
            },
            // handleSizeChange(val) {
            //     console.log(`每页 ${val} 条`);
            // },
            // handleCurrentChange(val) {
            //     console.log(`当前页: ${val}`);
            // },

        }
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