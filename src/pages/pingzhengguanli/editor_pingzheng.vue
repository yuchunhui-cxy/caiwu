<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">修改凭证</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">
                <!--上-->
                <div style="display: flex;justify-content: space-between;align-items: flex-start;">
                    <div>
                        <el-form :inline="true" :model="form" class="demo-form-inline">
                            <el-form-item label="凭证字号：">
                                <el-input v-model="form.code" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="号">
                            </el-form-item>
                            <el-form-item label="日期：">
                                <el-date-picker type="date" placeholder="" v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div>
                        <el-button type="warning" @click="$router.push({path: '/home/pingzhengguanli/xinzengfapiao',query:{'from':'pingzhengguanli_xiugai',certificateUuid:$route.query.certificateUuid}})">上传票据</el-button>
                        <el-button type="warning" @click="congxianyoupiaojuxuanze">从现有票据选择</el-button>
                    </div>
                </div>
                <!--中-->
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
                    <!--下-->
                    <div style="display: flex;justify-content: center;margin-top: 5vh;">
                        <el-button type="warning" @click="ok('user')">保存</el-button>
                        <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})">返回</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <!--从现有发票选择对话框-->
        <el-dialog title="" :visible.sync="dialogVisible" :close-on-press-escape="false" :close-on-click-modal="false">
            <el-table :data="tableData1" >
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
        mixins:[mix],
        data() {
            return {
                // 后台要的
                flag1:'',
                flag2:'',

                form: {
                    code: '',
                    date: ''
                },

                user:{
                    tableData:[]

                },
                index:0,
                list:[],

                dialogVisible:false,
                tableData1:[],
                id:'',
                page:1,
                pageSize:10,
                total:0
            }
        },
        mounted(){
            this.getStorage()

            this._ajax('userAccounts/selectClassName',{
            }, msg => {
                this.list = msg
                // this._message(1,"会计科目成功")
                this._ajax('userAccounts/selectCertificateUuid',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    certificateUuid:this.$route.query.certificateUuid
                }, msg => {
                    // 保存后台要的
                    this.flag1 = msg[0].flag1
                    this.flag2 = msg[0].flag2

                    this.form.code = msg[0].certificate_number
                    this.form.date = msg[0].creationTime

                    const x = []
                    msg.forEach((item,index)=>{
                        const y = {
                            name:item.accountant_subject + '-' + item.accountant_code,
                            zhaiyao:item.certificate_abstract,
                            jie:"",
                            dai:"",
                            index,
                            jie_show:false,
                            dai_show:false
                        }
                        if(item.total_credit_money == 0){
                            y.dai_show = true
                            y.jie = item.total_debit_money
                        }
                        if(item.total_debit_money == 0){
                            y.jie_show = true
                            y.dai = item.total_credit_money
                        }
                        // const y = {
                        //     name:item.accountant_subject + '-' + item.accountant_code,
                        //     zhaiyao:item.certificate_abstract,
                        //     jie:{a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:'',dian:'.',j:'',k:''},
                        //     dai:{a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:'',dian:'.',j:'',k:''},
                        //     index,
                        //     jie_show:false,
                        //     dai_show:false
                        // }
                        // if(item.total_debit_money == 0){
                        //     let data = item.total_credit_money.split(".")
                        //
                        //     if(item.total_credit_money.includes(".")){
                        //         y.dai.k = data[1][data[1].length - 1] || ""
                        //         y.dai.j = data[1][data[1].length - 2] || ""
                        //     }
                        //
                        //     y.jie_show = true
                        //
                        //     y.dai.i = data[0][data[0].length - 1] || ""
                        //     y.dai.h = data[0][data[0].length - 2] || ""
                        //     y.dai.g = data[0][data[0].length - 3] || ""
                        //     y.dai.f = data[0][data[0].length - 4] || ""
                        //     y.dai.e = data[0][data[0].length - 5] || ""
                        //     y.dai.d = data[0][data[0].length - 6] || ""
                        //     y.dai.c = data[0][data[0].length - 7] || ""
                        //     y.dai.b = data[0][data[0].length - 8] || ""
                        //     y.dai.a = data[0][data[0].length - 9] || ""
                        //     // y.jie = ''
                        // }else{
                        //     let data = item.total_debit_money.split(".")
                        //
                        //     if(item.total_debit_money.includes(".")){
                        //         y.jie.k = data[1][data[1].length - 1] || ""
                        //         y.jie.j = data[1][data[1].length - 2] || ""
                        //     }
                        //
                        //     y.dai_show = true
                        //
                        //
                        //     y.jie.i = data[0][data[0].length - 1] || ""
                        //     y.jie.h = data[0][data[0].length - 2] || ""
                        //     y.jie.g = data[0][data[0].length - 3] || ""
                        //     y.jie.f = data[0][data[0].length - 4] || ""
                        //     y.jie.e = data[0][data[0].length - 5] || ""
                        //     y.jie.d = data[0][data[0].length - 6] || ""
                        //     y.jie.c = data[0][data[0].length - 7] || ""
                        //     y.jie.b = data[0][data[0].length - 8] || ""
                        //     y.jie.a = data[0][data[0].length - 9] || ""
                        //
                        //
                        //     // y.dai = ''
                        // }
                        x.push(y)
                    })

                    this.index = msg.length -1
                    this.user.tableData = x
                    // this._message(1,"返显成功")
                })

            })
        },
        methods: {
            // 清除type1和fapiao
            clear(){
                sessionStorage.removeItem("type1")
                sessionStorage.removeItem("fapiao")
            },
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
            del(index){
                let i = this.user.tableData.findIndex(item=>{
                    return item.index == index
                })
                this.user.tableData.splice(i,1)
            },
            add(){
                this.index+=1
                // this.user.tableData.push({name:'',zhaiyao:'',jie:{a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:'',dian:'.',j:'',k:''},dai:{a:'',b:'',c:'',d:'',e:'',f:'',g:'',h:'',i:'',dian:'.',j:'',k:''},jie_show:false,dai_show:false,index:this.index})
                this.user.tableData.push({name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:this.index})

            },
            // 从现有票据选择
            congxianyoupiaojuxuanze(){
                this.list_bind()
            },
            list_bind(){
                this._ajax('userAccounts/selectNoInvoice',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.page,
                    pageSize:this.pageSize
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
            // 对话框的确定
            dialogVisible_ok(){
                if(this.id == 0){
                    this._message(2,"请选择一个")
                    return
                }
                sessionStorage.setItem("fapiao",JSON.stringify(this.id))
                sessionStorage.setItem("type1","pipei_fapiao")
                this.dialogVisible = false
            },
            // 保存
            ok(formName) {
                if(isNaN(Number(this.form.code)) && Number(this.form.code) <=0){
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
                            console.log(jie_num)
                            console.log(dai_num)

                            this._message(2,"借贷不平衡")
                            return
                        }
                        let certificateAbstract = ''
                        let debitMoney = ''
                        let creditMoney = ''
                        let subject = ''
                        let code = ''
                        this.user.tableData.forEach(item=>{
                            certificateAbstract += item.zhaiyao + ','
                            if(item.jie == ''){
                                debitMoney+= 0+','
                            }else{
                                debitMoney+= item.jie+','
                            }

                            if(item.dai == ''){
                                creditMoney+= 0+','
                            }else{
                                creditMoney+= item.dai+','
                            }

                            subject += item.name.split('-')[0]+','
                            code += item.name.split('-')[1]+','

                        })
                        // // 判断是否借贷平衡
                        // if(jie_num != dai_num){
                        //     this._message(2,"借贷不平衡")
                        //     return
                        // }
                        // let certificateAbstract = ''
                        // let debitMoney = ''
                        // let creditMoney = ''
                        // let subject = ''
                        // let code = ''
                        // this.user.tableData.forEach(item=>{
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
                        //         debitMoney+= 0+','
                        //     }else{
                        //         debitMoney+= jie_item_num+','
                        //     }
                        //
                        //     if(dai_item_num == '0.00'){
                        //         creditMoney+= 0+','
                        //     }else{
                        //         creditMoney+= dai_item_num+','
                        //     }
                        //     certificateAbstract += item.zhaiyao + ','
                        //     subject += item.name.split('-')[0]+','
                        //     code += item.name.split('-')[1]+','
                        // })
                        // // 判断是否借贷平衡
                        // if(jie_num != dai_num){
                        //     this._message(2,"借贷不平衡")
                        //     return
                        // }
                        // let certificateAbstract = ''
                        // let debitMoney = ''
                        // let creditMoney = ''
                        // let subject = ''
                        // let code = ''
                        // this.user.tableData.forEach(item=>{
                        //     certificateAbstract += item.zhaiyao + ','
                        //
                        //     if(item.jie == ''){
                        //         debitMoney+= 0+','
                        //     }else{
                        //         debitMoney+= item.jie+','
                        //     }
                        //
                        //     if(item.dai == ''){
                        //         creditMoney+= 0+','
                        //     }else{
                        //         creditMoney+= item.dai+','
                        //     }
                        //     subject += item.name.split('-')[0]+','
                        //     code += item.name.split('-')[1]+','
                        // })
                        // 如果是上传票据
                        if(sessionStorage.getItem("type1") == "shangchuan_fapiao"){
                            this._ajax('userAccounts/addCertificateInvoice',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                debitMoney,
                                creditMoney,
                                subject,
                                code,
                                certificateAbstract,

                                ...JSON.parse(sessionStorage.getItem("fapiao")),

                                flag1:this.flag1,
                                flag2:this.flag2,

                                certificateNumber:this.form.code,
                                time:this.form.date,

                                type1:1,
                                certificateUuid:this.$route.query.certificateUuid,
                            }, msg => {
                                this._message(1,"修改成功")
                                this.clear()
                                // this.$router.go(-1)
                                this.$router.push('/home/pingzhengguanli/pingzhengguanli')

                                // this.$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})
                            })
                            // 如果只是修改
                        }else if(!sessionStorage.getItem("type1")){
                            this._ajax('userAccounts/updateCertificate',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                debitMoney,
                                creditMoney,
                                subject,
                                code,
                                certificateAbstract,

                                flag1:this.flag1,
                                flag2:this.flag2,

                                certificateNumber:this.form.code,
                                time:this.form.date,


                                certificateUuid:this.$route.query.certificateUuid,

                            }, msg => {
                                this._message(1,"修改成功")
                                // this.$router.go(-1)
                                this.$router.push('/home/pingzhengguanli/pingzhengguanli')


                                this.clear()
                            })
                            // 如果从现有发票选择
                        }else if(sessionStorage.getItem("type1") == 'pipei_fapiao'){
                            // 修改凭证
                            this._ajax('userAccounts/updateCertificate',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                debitMoney,
                                creditMoney,
                                subject,
                                code,
                                certificateAbstract,

                                flag1:this.flag1,
                                flag2:this.flag2,

                                certificateNumber:this.form.code,
                                time:this.form.date,

                                certificateUuid:this.$route.query.certificateUuid,

                            }, msg => {
                                this._message(1,"修改成功")
                                this.$router.push('/home/pingzhengguanli/pingzhengguanli')
                                this.clear()
                            })
                            // 管理现有匹配和发票
                            this._ajax('userAccounts/updateAccountFlag',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,

                                certificateUuid:this.$route.query.uuid,
                                invoiceId:this.id
                            }, msg => {
                                // this._message(1,"匹配成功")
                                this.clear()
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // ok(){
            //     let jie = 0
            //     let dai = 0
            //     if(this.user.tableData[0].jie != ""){
            //         jie = this.user.tableData[0].jie
            //     }
            //     if(this.user.tableData[0].dai != ""){
            //         dai = this.user.tableData[0].dai
            //     }
            //     // 如果是上传票据
            //     if(localStorage.getItem("type1") == "xiugai_tianjiafapiao"){
            //         this._ajax('userAccounts/addCertificateInvoice',{
            //             uuid:this.uuid,
            //             workAccountId:this.accountId,
            //
            //             certificateAbstract:this.user.tableData[0].zhaiyao,
            //             totalDebitMoney:jie,
            //             totalCreditMoney:dai,
            //             accountantSubject:this.user.tableData[0].name.split("-")[0],
            //
            //             ...JSON.parse(localStorage.getItem("fapiao")),
            //
            //             type1:1,
            //             certificateUuid:this.$route.query.certificateUuid,
            //         }, msg => {
            //             this._message(1,"上传票据的修改成功")
            //             this.clear()
            //             // this.$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})
            //         })
            //         // 如果只是修改
            //     }else if(!localStorage.getItem("type1")){
            //         console.log(this.user.tableData[0].name.split("-")[1])
            //         this._ajax('userAccounts/updateCertificate',{
            //             uuid:this.uuid,
            //             workAccountId:this.accountId,
            //
            //             certificateId:this.$route.query.id,
            //             certificateAbstract:this.user.tableData[0].zhaiyao,
            //             totalDebitMoney:jie,
            //             totalCreditMoney:dai,
            //             accountantSubject:this.user.tableData[0].name.split("-")[0]
            //         }, msg => {
            //             this._message(1,"只是修改成功")
            //             this.clear()
            //         })
            //         // 如果从现有发票选择
            //     }else if(localStorage.getItem("type1") == 'xiugai_pipeifapiao'){
            //         // 修改凭证
            //         this._ajax('userAccounts/updateCertificate',{
            //             uuid:this.uuid,
            //             workAccountId:this.accountId,
            //
            //             certificateId:this.$route.query.id,
            //             certificateAbstract:this.user.tableData[0].zhaiyao,
            //             totalDebitMoney:jie,
            //             totalCreditMoney:dai,
            //             accountantSubject:this.user.tableData[0].name.split("-")[0]
            //         }, msg => {
            //             this._message(1,"修改成功")
            //             this.clear()
            //         })
            //         // 管理凭证个发票
            //         this._ajax('userAccounts/updateAccountFlag',{
            //             uuid:this.uuid,
            //             workAccountId:this.accountId,
            //
            //             certificateUuid:this.$route.query.uuid,
            //             invoiceId:this.id
            //         }, msg => {
            //             this._message(1,"匹配成功")
            //             this.clear()
            //         })
            //     }
            // },
            jie_change(e){
                let index = this.user.tableData.findIndex(item=>{
                    return item.index == e.index
                })
                if(e.jie != ''){
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
                if(e.dai != ''){
                    this.user.tableData[index].jie_show = true
                }else{
                    this.user.tableData[index].dai_show = false
                    this.user.tableData[index].jie_show = false
                }
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