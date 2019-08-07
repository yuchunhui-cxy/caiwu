<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;">
            <div style="text-align: center;color: #1C2023;font-size: 24px">期末结账 - 反结账</div>
            <div style="border: 1px solid black;width: 200px;text-align: center;margin-top: 5vh">
                <div class="title" style="margin: 2vh">
                    {{year}}年{{month}}期
                </div>
                <div style="">
                    <el-button v-if="show" @click="dialogVisible=true" style="margin: 2vh" type="info">反结账</el-button>
                    <el-button v-else @click="" style="margin: 2vh" type="info">反结账成功</el-button>

                </div>
            </div>
            <div style="display: flex;justify-content: center;margin: 15vh">
                <el-button type="info" style="" @click="$router.push({path:'/home/qimojiezhuan/one'})">返回</el-button>
            </div>
        </div>
        <el-dialog
                :close-on-click-modal="false"
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>您确定要反结账吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mix from "@/mixins/mixins"

    export default {
        name: "one",
        mixins: [mix],
        data(){
            return {
                show:true,
                year:'',
                month:'',
                dialogVisible:false
            }
        },
        mounted() {
            this.getStorage()
            const d = new Date()
            this.year = d.getFullYear()
            this.month = d.getMonth()+1

        },
        methods: {
            ok(){
                this._ajax('userHomePage/backPay',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    time:this.year+'-'+this.month
                }, msg => {

                    this._message(1,"反结账成功")
                    this.dialogVisible = false
                    this.show = false
                })
            },
            next() {
                this.$router.push({path: "/home/qimojiezhuan/two"})

            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 18px;
        color: #40454B;
    }

    .content {
        font-size: 36px;
        color: #212542;
    }
</style>