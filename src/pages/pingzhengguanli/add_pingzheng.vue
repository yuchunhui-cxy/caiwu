<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">新增凭证</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">

                <div style="display: flex;flex-wrap: wrap">

                    <div>
                        <el-form :inline="true" :model="form" class="demo-form-inline">

                            <el-form-item label="凭证字号：">
                                <el-input v-model="form.code" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="号">
                            </el-form-item>

                            <el-form-item label="日期：">
                                <el-date-picker @change="pingzhengzihao" type="date" placeholder="" v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div v-if="$route.query.from != 'liushuiguanli'" style="margin-left: 1vw">
                        <el-button type="warning" @click="$router.push({path: '/home/pingzhengguanli/xinzengfapiao',query:{'from':'pingzhengguanli_tianjiapingzheng'}})">上传票据</el-button>
                        <el-button type="warning" @click="congxianyoupiaojuxuanze">从现有票据选择</el-button>
                    </div>

                </div>

                <el-form :model="user" ref="user">

                    <el-table :data="user.tableData" style="width: 100%">
                        <el-table-column
                                prop=""
                                label="科目"
                                width="180">
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
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="亿"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.a" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="千"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.b" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="百"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.c" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="十"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.d" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="万"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.e" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="千"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.f" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="百"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.g" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="十"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.h" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="元"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.i" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="角"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.j" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="分"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.k" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <template slot-scope="scope">
                                <el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie" placeholder=""></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop=""
                                label="贷方金额">
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="亿"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.a" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="千"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.b" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="百"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.c" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="十"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.d" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="万"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.e" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="千"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.f" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="百"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.g" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="十"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.h" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="元"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.i" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="角"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.j" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="分"-->
                                    <!--width="60">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai.k" placeholder=""></el-input>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <template slot-scope="scope">
                                <el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai" placeholder=""></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="add" type="text" size="small">增加</el-button>
                                <el-button v-if="user.tableData.length !=2" @click="del(scope.row.index)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="display: flex;justify-content: center;margin-top: 5vh;" v-if="$route.query.from != 'liushuiguanli' && $route.query.from!= 'fapiaoguanli'">
                        <el-button type="warning" style="margin-right: 5vw" @click="ok('user',1)">保存并新增</el-button>

                        <el-button type="warning" @click="ok('user')">保存</el-button>

                        <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})">返回</el-button>

                    </div>

                    <div style="display: flex;justify-content: center;margin-top: 5vh;" v-if="$route.query.from == 'liushuiguanli'">

                        <el-button type="warning" @click="ok_liushui('user')">保存</el-button>

                        <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/zhangmian/liushui'})">返回</el-button>

                    </div>

                    <div style="display: flex;justify-content: center;margin-top: 5vh;" v-if="$route.query.from == 'fapiaoguanli'">

                        <el-button type="warning" @click="ok_fapiao('user')">保存</el-button>

                        <el-button type="info" style="margin-left: 5vw" @click="$router.go(-1)">返回</el-button>

                    </div>

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

            </div>
        </div>
        <el-dialog title="" :visible.sync="dialogVisible">
            <el-table :data="tableData1">
                <el-table-column
                        prop=""
                        label="单选"
                        width="60">
                    <template slot-scope="scope">
                        <el-radio v-model="id" :label="scope.row.id">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="creation_time"
                        label="上传时间"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="company_invoice_number"
                        label="发票号码"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="company_supplier_name"
                        label="供应商/客户名称"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="price_tax_total"
                        label="价税合计"
                        width="">
                </el-table-column>
                <!--<el-table-column-->
                        <!--fixed="right"-->
                        <!--label="操作"-->
                        <!--width="120">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button-->
                                <!--@click=""-->
                                <!--type="text"-->
                                <!--size="small">-->
                            <!--查看图片-->
                        <!--</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <div style="display: flex;justify-content: flex-end;margin-top: 1vh">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible_ok">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    export default {
        name: "xianjinliuliangbiao",
        inject:['reload'],
        mixins:[mix],
        data() {
            return {
                form: {
                    code: '',
                    date: new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date().getDate()).slice(-2)
                },

                user:{
                    tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],

                },
                list:[],
                index:1,

                total: 0,
                page: 1,
                pageSize:10,
                dialogVisible:false,
                tableData1:[],
                id:'',

            }
        },
        mounted(){
            this.getStorage()

            this.pingzhengzihao()

            this._ajax('userAccounts/selectClassName',{
                uuid:this.uuid,
                workAccountId:this.accountId,
            }, msg => {
                this.list = msg
                // this._message(1,"会计科目成功")
            })
        },
        // beforeRouteEnter (to, from, next) {
        //     // 在渲染该组件的对应路由被 confirm 前调用
        //     // 不！能！获取组件实例 `this`
        //     // 因为当守卫执行前，组件实例还没被创建
        //     console.log(to)
        //     console.log(from)
        //     console.log(next)
        //     if(true){
        //         next()
        //     }
        //     // next(vm => {
        //     //     console.log(vm)
        //     // })
        // },
        methods: {
            // 因为更换日期时凭证字号可能会跟着变
            pingzhengzihao(){
                this._ajax('userHomePage/selectCertificateNumber',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    time:this.form.date,
                }, msg => {
                    this.form.code = msg.number
                    // this._message(1,"凭证字号成功")
                })
            },

            ok_liushui(formName) {
                if(isNaN(Number(this.form.code)) || Number(this.form.code) <=0){
                    this._message(2,"凭证字号格式不正确")
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
                this.$refs[formName].validate((valid) => {
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

                        this._ajax('userAccounts/addFlowingWaterCertificate',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,

                            accountantSubject,
                            accountantCode,
                            totalCreditMoney,
                            totalDebitMoney,
                            certificateAbstract,

                            type1:2,
                            time:this.form.date,
                            certificateNumber:this.form.code,

                            accountingId:this.$route.query.accountingId,
                        }, msg => {
                            this._message(1,"保存成功")
                            this.$router.push({path: '/home/zhangmian/liushui'})
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            ok_fapiao(formName) {
                if(isNaN(Number(this.form.code)) || Number(this.form.code) <=0){
                    this._message(2,"凭证字号格式不正确")
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
                this.$refs[formName].validate((valid) => {
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

                        this._ajax('userAccounts/addCertificateInvoice',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,

                            accountantSubject,
                            accountantCode,
                            totalCreditMoney,
                            totalDebitMoney,
                            certificateAbstract,

                            type1:3,
                            time:this.form.date,
                            certificateNumber:this.form.code,

                            invoiceId:this.$route.query.invoiceId,
                        }, msg => {
                            this._message(1,"保存成功")
                            this.$router.go(-1)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 添加凭证
            ok(formName,reload) {
                if(isNaN(Number(this.form.code)) || Number(this.form.code) <=0){
                    this._message(2,"凭证字号格式不正确")
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

                // // 借和贷的总和
                // let jie_num = 0
                // let dai_num = 0
                // // 判断信息是否填写完整
                // let error = false
                //
                // this.user.tableData.forEach(item=>{
                //     // 每一项的借贷
                //     let jie_item_num = ""
                //     let dai_item_num = ""
                //
                //     for(let i in item.jie){
                //         // 如果没填元
                //         if(i == "i"){
                //             if(item.jie[i] == ""){
                //                 jie_item_num += "0"
                //             }else{
                //                 jie_item_num += item.jie[i]
                //
                //             }
                //         }else if(i == "j"){
                //             if(item.jie[i] == ""){
                //                 jie_item_num += "0"
                //             }else{
                //                 jie_item_num += item.jie[i]
                //             }
                //         }else if(i == "k"){
                //             if(item.jie[i] == ""){
                //                 jie_item_num += "0"
                //             }else{
                //                 jie_item_num += item.jie[i]
                //             }
                //         }else{
                //             jie_item_num += item.jie[i]
                //
                //         }
                //     }
                //     for(let i in item.dai){
                //         if(i == "i"){
                //             if(item.dai[i] == ""){
                //                 dai_item_num += "0"
                //
                //             }else{
                //                 dai_item_num += item.dai[i]
                //
                //             }
                //         }
                //         else if(i == "j"){
                //             if(item.dai[i] == ""){
                //                 dai_item_num += "0"
                //             }else{
                //                 dai_item_num += item.dai[i]
                //             }
                //         }else if(i == "k"){
                //             if(item.dai[i] == ""){
                //                 dai_item_num += "0"
                //             }else{
                //                 dai_item_num += item.dai[i]
                //             }
                //         }else{
                //             dai_item_num += item.dai[i]
                //
                //         }
                //     }
                //
                //     // 什么都没填的话就是.00
                //     if(jie_item_num == "0.00" && dai_item_num == "0.00"){
                //         error = true
                //         return
                //     }
                //     console.log(jie_item_num)
                //     console.log(dai_item_num)
                //
                //     if(jie_item_num != "0.00"){
                //         jie_num += Number(jie_item_num)
                //     }
                //     if(dai_item_num != "0.00"){
                //         dai_num += Number(dai_item_num)
                //
                //     }
                // })
                // jie_num = jie_num.toFixed(2)
                // dai_num = dai_num.toFixed(2)
                //
                // console.log(jie_num)
                // console.log(dai_num)
                //
                //
                // if(error){
                //     this._message(2,"请将信息填写完整")
                //     return
                // }

                this.$refs[formName].validate((valid) => {
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
                        // // 判断是否借贷平衡
                        // if(jie_num != dai_num){
                        //     this._message(2,"借贷不平衡")
                        //     return
                        // }
                        // let certificateAbstract = ''
                        // let totalDebitMoney = ''
                        // let totalCreditMoney = ''
                        // let accountantSubject = ''
                        // let accountantCode = ''
                        // this.user.tableData.forEach(item=>{
                        //     certificateAbstract += item.zhaiyao + ','
                        //
                        //     let jie_item_num = ""
                        //     let dai_item_num = ""
                        //
                        //     for(let i in item.jie){
                        //         // 如果没填元
                        //         if(i == "i"){
                        //             if(item.jie[i] == ""){
                        //                 jie_item_num += "0"
                        //             }else{
                        //                 jie_item_num += item.jie[i]
                        //
                        //             }
                        //         }else if(i == "j"){
                        //             if(item.jie[i] == ""){
                        //                 jie_item_num += "0"
                        //             }else{
                        //                 jie_item_num += item.jie[i]
                        //             }
                        //         }else if(i == "k"){
                        //             if(item.jie[i] == ""){
                        //                 jie_item_num += "0"
                        //             }else{
                        //                 jie_item_num += item.jie[i]
                        //             }
                        //         }else{
                        //             jie_item_num += item.jie[i]
                        //
                        //         }
                        //
                        //
                        //
                        //
                        //     }
                        //
                        //     for(let i in item.dai){
                        //         if(i == "i"){
                        //             if(item.dai[i] == ""){
                        //                 dai_item_num += "0"
                        //
                        //             }else{
                        //                 dai_item_num += item.dai[i]
                        //
                        //             }
                        //         }
                        //         else if(i == "j"){
                        //             if(item.dai[i] == ""){
                        //                 dai_item_num += "0"
                        //             }else{
                        //                 dai_item_num += item.dai[i]
                        //             }
                        //         }else if(i == "k"){
                        //             if(item.dai[i] == ""){
                        //                 dai_item_num += "0"
                        //             }else{
                        //                 dai_item_num += item.dai[i]
                        //             }
                        //         }else{
                        //             dai_item_num += item.dai[i]
                        //
                        //         }
                        //     }
                        //
                        //     if(jie_item_num == '0.00'){
                        //         totalDebitMoney+= 0+','
                        //     }else{
                        //         totalDebitMoney+= jie_item_num+','
                        //     }
                        //
                        //     if(dai_item_num == '0.00'){
                        //         totalCreditMoney+= 0+','
                        //     }else{
                        //         totalCreditMoney+= dai_item_num+','
                        //     }
                        //     accountantSubject += item.name.split('-')[0]+','
                        //     accountantCode += item.name.split('-')[1]+','
                        // })
                        // 如果是上传票据
                        if(sessionStorage.getItem("type1") == "shangchuan_fapiao"){
                            this._ajax('userAccounts/addCertificateInvoice',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                accountantSubject,
                                accountantCode,
                                totalCreditMoney,
                                totalDebitMoney,
                                certificateAbstract,

                                ...JSON.parse(sessionStorage.getItem("fapiao")),

                                time:this.form.date,
                                certificateNumber:this.form.code,

                                type1:0
                            }, msg => {
                                this._message(1,"添加凭证和发票成功")
                                this.clear()
                                this.$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})
                            })
                            // 如果是从现有票据选择
                        }else if(sessionStorage.getItem("type1") == "pipei_fapiao"){
                            this._ajax('userAccounts/addCertificateInvoice',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                accountantSubject,
                                accountantCode,
                                totalCreditMoney,
                                totalDebitMoney,
                                certificateAbstract,

                                time:this.form.date,
                                certificateNumber:this.form.code,


                                invoiceId:sessionStorage.getItem("fapiao"),
                                type1:3,
                            }, msg => {
                                this._message(1,"添加凭证和匹配发票成功")
                                this.clear()
                                this.$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})
                            })
                            // 如果只是上传凭证
                        }else if(!sessionStorage.getItem("type1")){
                            this._ajax('userAccounts/addCertificate',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                time:this.form.date,
                                certificateNumber:this.form.code,

                                accountantSubject,
                                accountantCode,
                                totalCreditMoney,
                                totalDebitMoney,
                                certificateAbstract,
                            }, msg => {
                                this._message(1,"只添加凭证成功")
                                this.$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})
                            })
                        }
                        // 如果并新增
                        if(reload){
                            this.reload()
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


            // 清除type1和fapiao
            clear(){
                sessionStorage.removeItem("type1")
                sessionStorage.removeItem("fapiao")
            },
            // 从现有票据选择
            congxianyoupiaojuxuanze(){
                this.list_bind()
            },
            // 匹配凭证的表格
            list_bind(){
                this._ajax('userAccounts/selectNoInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.page,
                    pageSize:this.pageSize
                    // time:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                }, msg => {
                    this.tableData1 = msg.PageInfo.list
                    this.total = msg.PageInfo.total
                    this.dialogVisible = true
                    // this._message(1,"票据成功")
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.list_bind()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye = val
                this.list_bind()
            },
            // 匹配发票的确定键
            dialogVisible_ok(){
                if(this.id == 0){
                    this._message(2,"请选择一个")
                    return
                }
                this.dialogVisible = false
                sessionStorage.setItem("fapiao",JSON.stringify(this.id))
                sessionStorage.setItem("type1","pipei_fapiao")
                this.id = ''
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
                // this.user.tableData.push({name:'',zhaiyao:'',jie:{a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:'',dian:'.',j:'',k:''},dai:{a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:'',dian:".",j:'',k:''},jie_show:false,dai_show:false,index:this.index})
                this.user.tableData.push({name:'',zhaiyao:'',jie:'',dai:'',jie_show:false,dai_show:false,index:this.index})

            },
            del(index){
                let i = this.user.tableData.findIndex(item=>{
                    return item.index == index
                })
                this.user.tableData.splice(i,1)
            },

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