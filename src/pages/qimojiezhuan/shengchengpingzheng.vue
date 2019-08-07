<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">{{title}}</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">

                <div style="overflow-x: auto;width: 100%;white-space: nowrap;">

                        <el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">

                            <el-form-item label="凭证字号：">
                                <el-input v-model="form.search" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="号">
                            </el-form-item>

                            <!--<el-form-item label="日期：">-->
                                <!--<el-date-picker type="date" placeholder="" v-model="form.code"></el-date-picker>-->

                            <!--</el-form-item>-->
                        </el-form>

                </div>

                <el-form :model="user" ref="user">

                <div>
                    <el-table
                            :row-class-name="tableRowClassName"
                            :data="user.tableData"
                            style="width: 100%">
                        <el-table-column
                                prop=""
                                label="科目"
                                width="180">
                            <template slot-scope="scope">
                                <!--<el-select v-model="scope.row.name" placeholder="请选择" style="width: 100%;">-->
                                    <!--<el-option :key="item.id" v-for="item in list" :label="item.name" :value="item.name+'-'+item.code"></el-option>-->
                                <!--</el-select>-->
                                <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.name'" :rules="[{ required: true, message: '请输入科目', trigger: 'change' }]">
                                    <el-select filterable v-model="scope.row.name" placeholder="请选择" style="width: 100%;">
                                        <el-option :key="item.id" v-for="item in list" :label="item.name" :value="item.name+'-'+item.code"></el-option>
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
                </div>

                <div style="display: flex;justify-content: center;margin-top: 5vh;">

                    <el-button type="warning" @click="ok('user')">保存</el-button>

                    <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/qimojiezhuan/one',query:{date:$route.query.date}})">返回</el-button>


                </div>
                </el-form>





            </div>

        </div>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"

    export default {
        name: "xianjinliuliangbiao",
        mixins:[mix],

        inject:['reload'],
        data() {
            return {
                index:0,
                list:[],
                yue: "",
                user:{
                    tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                },
                form: {
                    search:'',
                },
                title:'',
            }
        },
        mounted(){
            this.getStorage()
            const d = new Date()
            this.year = d.getFullYear()
            this.month = d.getMonth()+1

            this._ajax('userHomePage/selectCertificateNumber',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                time:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date().getDate()).slice(-2),
            }, msg => {
                this.form.search = msg.number
                // this._message(1,"凭证字号成功")

            })
            if(this.$route.query.number == 1){
                this.title='添加销售成本凭证'
                this._ajax('userHomePage/marketList',{
                }, msg => {
                    this.list = msg
                    // this._message(1,"销售成本科目成功")
                })
            }
            if(this.$route.query.number == 2){
                this.title='添加职工薪酬凭证'
                this._ajax('userHomePage/workerList',{
                }, msg => {
                    this.list = msg
                    // this._message(1,"职工薪酬科目成功")
                })
            }
            if(this.$route.query.number == 3){
                this.title='添加固定资产折旧凭证'
                this._ajax('userHomePage/selectOldTemplate',{
                }, msg => {
                    this.list = msg
                    // this._message(1,"固定资产折旧科目成功")
                })
            }
            if(this.$route.query.number == 4){
                this.title='添加长期摊销凭证'
                this._ajax('userHomePage/selectLongSellTemplate',{
                }, msg => {
                    this.list = msg
                    // this._message(1,"长期摊销科目成功")
                })
            }
            if(this.$route.query.number == 5){
                this.title='添加计提税金凭证'
                this._ajax('userHomePage/jiTiShuiJinTemplate',{
                }, msg => {
                    this.list = msg
                    // this._message(1,"计提税金科目成功")
                })
            }
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
            ok(formName){
                if(isNaN(Number(this.form.search)) || Number(this.form.search) <=0){
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

                        let abstract = ''
                        let debitMoney = ''
                        let creditMoney = ''
                        let name = ''
                        let code = ''
                        this.user.tableData.forEach(item=>{
                            abstract += item.zhaiyao + ','
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

                            name += item.name.split('-')[0]+','
                            code += item.name.split('-')[1]+','


                        })
                        // // 判断是否借贷平衡
                        // if(jie_num != dai_num){
                        //     this._message(2,"借贷不平衡")
                        //     return
                        // }
                        // let abstract = ''
                        // let debitMoney = ''
                        // let creditMoney = ''
                        // let name = ''
                        // let code = ''
                        // this.user.tableData.forEach(item=>{
                        //     abstract += item.zhaiyao + ','
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
                        //     name += item.name.split('-')[0]+','
                        //     code += item.name.split('-')[1]+','
                        // })
                        if(this.$route.query.number == 1){
                            this._ajax('userHomePage/addMarket',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                time:this.$route.query.date,
                                number:this.form.search,
                                name,
                                code,
                                creditMoney,
                                debitMoney,
                                abstract
                            }, msg => {
                                this._message(1,"结账成功")
                                // this.$router.push("/home/qimojiezhuan/one")
                                this.path()

                                // this.$router.push({path:'/home'})
                            })
                        }
                        if(this.$route.query.number == 2){
                            this._ajax('userHomePage/addWorker',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                time:this.$route.query.date,
                                number:this.form.search,
                                name,
                                code,
                                creditMoney,
                                debitMoney,
                                abstract
                            }, msg => {
                                this._message(1,"结账成功")
                                // this.$router.push("/home/qimojiezhuan/one")
                                this.path()

                                // this.$router.push({path:'/home'})
                            })
                        }
                        if(this.$route.query.number == 3){
                            this._ajax('userHomePage/addOldCargo',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                time:this.$route.query.date,
                                number:this.form.search,
                                name,
                                code,
                                creditMoney,
                                debitMoney,
                                abstract
                            }, msg => {
                                this._message(1,"结账成功")
                                // this.$router.push("/home/qimojiezhuan/one")
                                this.path()

                                // this.$router.push({path:'/home'})
                            })
                        }
                        if(this.$route.query.number == 4){
                            this._ajax('userHomePage/addLongSell',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                time:this.$route.query.date,
                                number:this.form.search,
                                name,
                                code,
                                creditMoney,
                                debitMoney,
                                abstract
                            }, msg => {
                                this._message(1,"结账成功")
                                // this.$router.push("/home/qimojiezhuan/one")
                                this.path()

                                // this.$router.push({path:'/home'})
                            })
                        }
                        if(this.$route.query.number == 5){
                            this._ajax('userHomePage/addjiTiShuiJin',{
                                uuid:this.uuid,
                                workAccountId:this.accountId,
                                time:this.$route.query.date,
                                number:this.form.search,
                                name,
                                code,
                                creditMoney,
                                debitMoney,
                                abstract
                            }, msg => {
                                this._message(1,"结账成功")
                                this.path()
                                // this.$router.push({path:'/home'})
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            path(){
                this.$router.push({path:"/home/qimojiezhuan/one",query:{date:this.$route.query.date}})
            },
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
            add(){
                this.index+=1
                this.user.tableData.push({name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:this.index})
            },
            del(index){
                let i = this.user.tableData.findIndex(item=>{
                    return item.index == index
                })
                this.user.tableData.splice(i,1)
            },




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
            }
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