<template>
    <div>
        <div style="background: #FFF;padding: 2vw;">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">添加发票</div>

            <div style="border: 1px solid #F8F8FF;padding: 2vw;margin-top: 2vh">

                <!--<el-upload :on-change="change" action="#" :show-file-list="false">-->
                    <!--<el-button type="warning">点击上传</el-button>-->
                <!--</el-upload>-->

                <div style="border-bottom: 1px solid rgba(96,105,114,0.3);margin: 3vh 0"></div>

                <el-form ref="form" :model="form" label-width="90px" :rules="rules">
                    <div style="display: flex;flex-wrap: wrap">
                        <div style="width: 350px;">
                            <el-form-item label="发票类型：" prop="">
                                <el-select v-model="form.name" placeholder="请选择活动区域" style="width: 100%;">
                                    <el-option label="男" value="shanghai"></el-option>
                                    <el-option label="女" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="开票日期：">
                                <el-date-picker style="width: 100%;" type="date" placeholder="" v-model="form.date"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="认证日期：">
                                <el-date-picker style="width: 100%;" type="date" placeholder="" v-model="form.date"></el-date-picker>

                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="发票号码：">
                                <el-input v-model="form.name" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 300px;">
                            <el-form-item label="" label-width="10px">
                                <el-select v-model="form.name" placeholder="请选择类型" style="width: 100%;">
                                    <el-option label="男" value="shanghai"></el-option>
                                    <el-option label="女" value="beijing"></el-option>
                                </el-select>

                            </el-form-item>
                        </div>
                        <div style="width: 900px;">
                            <el-form-item label="" label-width="10px">
                                <el-input v-model="form.name" style="width: 50%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="金额：">
                                <el-input v-model="form.name" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="税率：">
                                <el-input v-model="form.name" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="价税合计：">
                                <el-input v-model="form.name" style="width: 100%;"></el-input>
                            </el-form-item>

                        </div>
                        <div style="width: 350px;">
                            <el-form-item label="元" label-width="30px">
                            </el-form-item>

                        </div>

                    </div>

                </el-form>

                <div style="border-bottom: 1px solid rgba(96,105,114,0.3);"></div>


                <div style="margin: 3vh">
                    <img :src="img" alt="">
                </div>


                <div style="display: flex;justify-content: center;margin-top: 5vh;">
                    <el-button type="warning"  @click="submitForm('form')">保存</el-button>

                    <el-button type="info" style="margin-left: 5vw" @click="$router.push({path: '/home/jizhang/index'})">取消</el-button>

                </div>




            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "xianjinliuliangbiao",
        data() {
            return {
                value: "",
                options:[{label:"男",value:1},{label:"女",value:0}],

                img:'',


                form:{
                    code:'',
                    name:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ]
                },
                title:["添加员工","修改员工"]
            }
        },
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            console.log(to)
            console.log(from)
            console.log(next)
            if(true){
                next()
            }
            // next(vm => {
            //     console.log(vm)
            // })
        },
        methods: {
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
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.$router.push({path: '/home/jizhang/index'})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 上传文件
            change(file){
                let me = this
                var reader = new FileReader()
                reader.readAsDataURL(file.raw);
                reader.onload = function () {
                    me.img = reader.result
                }
            }
        },
    }
</script>

<style>


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