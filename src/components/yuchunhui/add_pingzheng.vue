<template>
    <div>
        <el-form :model="user" ref="user">

            <el-table :data="user.tableData" style="width: 100%">
                <el-table-column
                        prop=""
                        label="科目"
                        width="">
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
                        width="">
                    <template slot-scope="scope">
                        <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.zhaiyao'" :rules="[{ required: true, message: '请输入摘要', trigger: 'blur' }]">
                            <el-input v-model="scope.row.zhaiyao" placeholder=""></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="借方金额"
                        width="">
                    <el-table-column prop="name" label="亿" width="60">
                        <template slot-scope="scope">
                            <el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie.a" placeholder=""></el-input>
                        </template>
                    </el-table-column>

                    <template slot-scope="scope">
                        <el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="贷方金额"
                        width="">
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

            <!--<div style="display: flex;justify-content: center;margin-top: 5vh;" v-if="$route.query.from != 'liushuiguanli' && $route.query.from!= 'fapiaoguanli'">-->
                <!--<el-button type="warning" style="margin-right: 5vw" @click="ok('user',1)">保存并新增</el-button>-->

                <!--<el-button type="warning" @click="ok('user')">保存</el-button>-->

                <!--<el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/pingzhengguanli/pingzhengguanli'})">返回</el-button>-->

            <!--</div>-->

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "add_pingzheng",
        data(){
            return {
                index:1,
                list:[],
                user:{
                    tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                },
            }
        },
        mounted(){
            this._ajax('userAccounts/selectClassName',{
                uuid:this.uuid,
                workAccountId:this.accountId,
            }, msg => {
                this.list = msg
                // this._message(1,"会计科目成功")
            })
        },
        methods:{
            jie_change(e){
                let index = this.user.tableData.findIndex(item=>{
                    return item.index == e.index
                })

                if(this.user.tableData[index].jie != ""){
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

                if(this.user.tableData[index].dai != ""){
                    this.user.tableData[index].jie_show = true
                }else{
                    this.user.tableData[index].dai_show = false
                    this.user.tableData[index].jie_show = false
                }
            },
            add(){
                this.index+=1
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

<style scoped>

</style>