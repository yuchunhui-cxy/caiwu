<template>
    <div style="width: 100%;height: 100%;">
        <div class="bg"></div>
        <!--<img src="@/assets/images/one.png" alt="">-->
        <el-button style="position: fixed;top: 430px;left: 1200px;z-index: 1;" @click="btn">下一步</el-button>
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
        background: url("../../assets/images/one.png");
        background-size: 100%;
        background-repeat: no-repeat;
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