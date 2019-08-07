<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="position: relative">
                <div style="text-align: center;color: #1C2023;font-size: 24px">{{year}} 年 {{month}} 期 期末结转</div>
                <div style="position: absolute;top: 0;right: 0;">
                    <el-button @click="fanjiezhang">反结账</el-button>
                </div>
            </div>
            <div style="margin: 3vh;font-size: 24px;color: #1C2023;">
                第一步 期末检查
            </div>
            <div style="display: flex;justify-content: space-around;">

                <div style="border: 1px solid black;width: 200px;margin: 2vh 2vw">
                    <div class="title" style="text-align: center;margin: 2vh">
                        销售成本
                    </div>
                    <div style="border-bottom: 1px solid black;"></div>
                    <div style="text-align: center;">
                        <div style="margin: 0vh 0 0vh 0" class="content">0.0</div>
                        <div style="height: 20px;">
                        </div>
                        <el-button v-if="!flag1" style="margin: 2vh" type="info" @click="$router.push({path:'/home/qimojiezhuan/shengchengpingzheng',query:{number:1,date:$route.query.date}})">生成凭证</el-button>
                        <el-button v-else disabled style="margin: 2vh" type="info" @clikc="">已生成凭证</el-button>
                    </div>
                </div>

                <div style="border: 1px solid black;width: 200px;margin: 2vh 2vw">
                    <div class="title" style="text-align: center;margin: 2vh">
                        职工薪酬
                    </div>
                    <div style="border-bottom: 1px solid black;"></div>
                    <div style="text-align: center;">
                        <div style="margin: 0vh 0 0vh 0" class="content">0.0</div>
                        <div style="height: 20px;">
                        </div>
                        <el-button v-if="!flag2" style="margin: 2vh" type="info" @click="$router.push({path:'/home/qimojiezhuan/shengchengpingzheng',query:{number:2,date:$route.query.date}})">生成凭证</el-button>
                        <el-button v-else disabled style="margin: 2vh" type="info" @clikc="">已生成凭证</el-button>
                    </div>
                </div>

                <div style="border: 1px solid black;width: 200px;margin: 2vh 2vw">
                    <div class="title" style="text-align: center;margin: 2vh">
                        固定资产折旧
                    </div>
                    <div style="border-bottom: 1px solid black;"></div>
                    <div style="text-align: center;">
                        <div style="margin: 0vh 0 0vh 0" class="content">{{oldMoeny}}</div>
                        <div style="height: 20px;">
                            <router-link style="text-decoration:none" :to="{path:'/home/qimojiezhuan/fixed_assets_management',query:{date:$route.query.date}}">修改折旧</router-link>
                        </div>
                        <el-button v-if="!flag3" style="margin: 2vh" type="info" @click="$router.push({path:'/home/qimojiezhuan/shengchengpingzheng',query:{number:3,date:$route.query.date}})">生成凭证</el-button>
                        <el-button v-else disabled style="margin: 2vh" type="info" @clikc="">已生成凭证</el-button>
                    </div>
                </div>

                <div style="border: 1px solid black;width: 200px;margin: 2vh 2vw">
                    <div class="title" style="text-align: center;margin: 2vh">
                        长期摊销
                    </div>
                    <div style="border-bottom: 1px solid black;"></div>
                    <div style="text-align: center;">
                        <div style="margin: 0vh 0 0vh 0" class="content">0.0</div>
                        <div style="height: 20px;">
                        </div>
                        <el-button v-if="!flag4" style="margin: 2vh" type="info" @click="$router.push({path:'/home/qimojiezhuan/shengchengpingzheng',query:{number:4,date:$route.query.date}})">生成凭证</el-button>
                        <el-button v-else disabled style="margin: 2vh" type="info" @clikc="">已生成凭证</el-button>
                    </div>
                </div>

                <div style="border: 1px solid black;width: 200px;margin: 2vh 2vw">
                    <div class="title" style="text-align: center;margin: 2vh">
                        计提税金
                    </div>
                    <div style="border-bottom: 1px solid black;"></div>
                    <div style="text-align: center;">
                        <div style="margin: 0vh 0 0vh 0" class="content">{{countMoeny}}</div>
                        <div style="height: 20px;">
                        </div>
                        <el-button v-if="!flag5" style="margin: 2vh" type="info" @click="$router.push({path:'/home/qimojiezhuan/shengchengpingzheng',query:{number:5,date:$route.query.date}})">生成凭证</el-button>
                        <el-button v-else disabled style="margin: 2vh" type="info" @clikc="">已生成凭证</el-button>
                    </div>
                </div>

            </div>

            <div style="margin: 3vh;font-size: 16px;color: #606972;">
                请仔细确认每一项需要生成的凭证，确认无误后点击下一步
            </div>

            <div style="display: flex;justify-content: center;margin-top 15vh">
                <el-button v-if="type" type="warning" @click="next">下一步</el-button>
                <el-button type="info" style="margin-left: 3vw" @click="$router.push({path:'/home'})">返回</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"

    export default {
        name: "one",
        mixins:[mix],
        mounted(){
            this.getStorage()

            this._ajax('userHomePage/userMonthOver',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                time:this.$route.query.date,

            }, msg => {
                if(msg.flag1 == 1){
                    this.flag1 = true
                }
                if(msg.flag2 == 1){
                    this.flag2 = true
                }
                if(msg.flag3 == 1){
                    this.flag3 = true
                }
                if(msg.flag4 == 1){
                    this.flag4 = true
                }
                if(msg.flag5 == 1){
                    this.flag5 = true
                }
                this.oldMoeny = msg.oldMoeny
                this.countMoeny = msg.countMoeny
                if(msg.type==1){
                    this.type = false
                }else{
                    this.type = true

                }
                // this._message(1,"初始化成功")
            })

        },
        data(){
            return{
                type:"",
                year:this.$route.query.date.split("-")[0],
                month:this.$route.query.date.split("-")[1],
                oldMoeny:"",
                countMoeny:'',
                flag1:false,
                flag2:false,
                flag3:false,
                flag4:false,
                flag5:false,
            }
        },
        methods:{


            add(){},
            next(){
                this.$router.push({path:"/home/qimojiezhuan/two",query:{date:this.$route.query.date}})
            },
            fanjiezhang(){
                this.$router.push({path:"/home/qimojiezhuan/fanjiezhang"})
            }
        }
    }
</script>

<style scoped>
    .title{
        font-size: 18px;
        color: #40454B;
    }
    .content{
        font-size: 36px;
        color: #212542;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>