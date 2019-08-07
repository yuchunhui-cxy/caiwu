<template>
    <div style="width: 100%;height: 100%;">
        <div style="width: 100%;height: 100%;background: url('https://caishui.oss-cn-beijing.aliyuncs.com/index.jpg');background-size: 100%;background-repeat: no-repeat;position: relative;">
            <div @click="$router.push('/home')" style="background: url('https://caishui.oss-cn-beijing.aliyuncs.com/btn.png');background-size: 100%;background-repeat: no-repeat;width: 205px;height: 55px;position: absolute;right: 5vw;top: 5vh;cursor: pointer;" ></div>
        </div>
        <!--<el-button style="position: fixed;top: 430px;left: 1200px;z-index: 1;" @click="btn">下一步</el-button>-->
    </div>
</template>

<script>
    export default {
        name: "xianjinliuliangbiao",
        data() {
            return {
                value: "",
                options:[{label:"男",value:1},{label:"女",value:0}],


                form:{
                    user:''
                }
            }
        },
        methods: {
            btn(){
                this.$router.push({path:"/home"})
            },
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
    .bg{
        width: 100%;
        height: 100%;
        background: url("https://caishui.oss-cn-beijing.aliyuncs.com/%E8%B4%A2%E5%8A%A1%E8%BD%AF%E4%BB%B6%E5%B9%BF%E5%91%8A%E9%A1%B5.jpg");
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative;
    }
    .img{
        width: 205px;
        height: 55px;
        position: absolute;
        right: 5vw;
        top: 5vh;
        cursor: pointer;
    }


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