<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div>
                <div style="text-align: center;color: #1C2023;font-size: 24px">{{year}}年{{month}}期 期末结转</div>

                <div style="font-size: 24px;color: #1C2023;margin: 3vh 0">
                    第二步 结转损益
                </div>
                <div>
                    <el-form :model="user" ref="user">
                        <el-table
                                :row-class-name="tableRowClassName"
                                :data="user.tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop=""
                                    label="科目"
                                    width="180">
                                <template slot-scope="scope">
                                    <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.name'" :rules="[{ required: true, message: '请输入科目', trigger: 'change' }]">
                                        <el-select v-model="scope.row.name" placeholder="请选择" style="width: 100%;">
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

                        <div style="display: flex;justify-content: center;margin: 15vh">
                            <el-button type="warning" @click="$router.push({path:'/home/qimojiezhuan/one',query:{date:$route.query.date}})">上一步</el-button>
                            <el-button type="primary" style="margin-left: 3vw" @click="ok('user')">结账</el-button>
                            <el-button type="info" style="margin-left: 3vw" @click="$router.push({path:'/home'})">返回</el-button>
                        </div>
                    </el-form>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
    import mix from "@/mixins/mixins"

    export default {
        name: "one",
        mixins:[mix],

        data(){
            return{
                list:[],
                year:this.$route.query.date.split("-")[0],
                month:this.$route.query.date.split("-")[1],
                form:{
                    search:'',
                },
                index:0,
                user:{
                    tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],

                }
            }
        },
        mounted(){
            this.getStorage()


            this._ajax('userHomePage/selectCertificateNumber',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                time:this.$route.query.date,
            }, msg => {
                this.form.search = msg.number
                this._message(1,"凭证字号成功")
            })

            this._ajax('userHomePage/jieZhuanSunYiTemplate',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                timeMonth:this.$route.query.date
            }, msg => {
                this.list = msg
                this._message(1,"科目成功")
            })
        },
        methods:{

            ok(formName){
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
                        this._ajax('userHomePage/addJieZhuanSunYi',{
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
                            this.$router.push({path:'/home'})
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

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
                console.log(this.user.tableData)
            },
            del(index){
                let i = this.user.tableData.findIndex(item=>{
                    return item.index == index
                })
                this.user.tableData.splice(i,1)
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 != 0) {
                    return 'lan';
                }
                return "";
            }
        }
    }
</script>

<style scoped>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }

    .title{
        font-size: 18px;
        color: #40454B;
    }
    .content{
        font-size: 36px;
        color: #212542;
    }
</style>