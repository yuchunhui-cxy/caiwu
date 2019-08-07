<template>
    <div class="orderMsg">
        <el-card class="box-card">
            <div class="box1-title">当前订单状态：待发货
                <div class="box1-title-btn">返回列表</div>
            </div>
        </el-card>
        <div class="box1-banner2-btn">订单详情</div>
        <grey>
            <template v-slot:title>
                <div>
                    订单信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <div class="box1-head-1">订单编号12345678799789778</div>
                    <div class="box1-table">
                        <el-table
                            :data="tableData"
                            height="100%"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="用户ID"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="account_number"
                                label="用户手机号"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="city"
                                align="center"
                                label="站长姓名">
                            </el-table-column>
                            <el-table-column
                                prop="mobile"
                                align="center"
                                label="站长手机号">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="商品名称">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="包裹号">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="实付金额">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="订单状态">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="收货地址">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="下单时间">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    商品信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <!-- show-summary -->
                    <div class="box1-table">
                        <el-table
                            
                            :data="tableData"
                            height="100%"
                            border
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="图片"
                                align="center"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="account_number"
                                label="商品名称"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="city"
                                align="center"
                                label="价格">
                            </el-table-column>
                            <el-table-column
                                prop="mobile"
                                align="center"
                                label="数量">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="实际支付">
                            </el-table-column>
                            <el-table-column
                                prop="companyName"
                                align="center"
                                label="获得积分">
                            </el-table-column>
                            
                        </el-table>
                    </div>
                    <div class="box1-head">
                        <div>积分抵扣：&yen;-1.55</div>
                        <div>运费：0</div>
                        <div>应付金额： <span class="red">&yen;1866.6</span></div>
                    </div>
                </div>
            </template>
        </grey>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
    import grey from './greyTable';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                headerMin: {
                    typeValue: this.typeDefault,
                    seachValue: '',
                    seachValue2: '',
                    classValue: '',
                    dateValue: []
                },
                radioValue: this.classDefault,
                modelState: {
                    crumbs: false,
                    radio: false,
                    select: false,
                    search: false,
                    search2:false,
                    date: false
                },
                title:'123',
                tableData: [],
            }
        },
        created () {
            this.showoption.forEach((item, index) => {
                switch (item) {
                    case 'crumbs':
                        this.modelState.crumbs = true;
                        break;
                    case 'radio':
                        this.modelState.radio = true;
                        break;
                    case 'select':
                        this.modelState.select = true;
                        break;
                    case 'search':
                        this.modelState.search = true;
                        break;
                    case 'search2':
                        this.modelState.search2 = true;
                        break;
                    case 'date':
                        this.modelState.date = true;
                        break;
                }
            });
        },
        watch: {
            radioValue (val) {
                this.headerMin.classValue = val;
                this.$emit('watchSeach', this.headerMin);
            }
        },
        methods: {
            getTime(e) {
                if (e === null) {
                    this.headerMin.dateValue = "";
                }
                this.$emit('watchSeach', this.headerMin)
            }
        },
        components: {
            grey
        },
        mixins: [ mixin ],
        props: {
            onlyInfo: {
                type: Object,
                default() {
                    return {
                        nameA: '首页',
                        nameB: '销售平台'
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .orderMsg{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .box1-head-1{
        padding: 20px;
    }
    .box1-head{
        padding: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }

    .box1-title{
        font-size: 20px;
        font-weight: 700;
        padding: 0 20px;
    }
    .box1-title-btn{
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        float: right;
        cursor: pointer;
    }
    .box1-banner2-btn{
        font-size: 14px;
        padding: 3px 20px;
        background: #6699CC;
        display: inline-block;
        color: #fff;
        margin-top: 10px;
        border: 1px solid #ddd;
    }
    .red{
        color: #f44;
    }
</style>
