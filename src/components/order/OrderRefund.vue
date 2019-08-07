<template>
    <div class="orderMsg">
        <el-card class="box-card">
            <div class="box1-title">
                <div class="box1-title-btn" @click="$emit('close')">返回列表</div>
            </div>
        </el-card>
        <grey>
            <template v-slot:title>
                <div>
                    退款信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <div class="box1-content">
                        <div class="box1-box">
                            <div>订单编号：5656565566541564646</div>
                            <div>订单金额：5656</div>
                            <div>退款方式：线下打款</div>
                            <div>退款原因：不想要了</div>
                        </div>
                        <div class="box1-box">
                            <div>手机号：15620678316</div>
                            <div>确认退款金额：564</div>
                        </div>
                        <div class="box1-box">
                            <div>申请时间：2019-03-15 12:15:26</div>
                        </div>
                        <div class="box1-box">
                            <div>申请状态：申请退款</div>
                        </div>
                    </div>
                </div>
            </template>
        </grey>
        <grey>
            <template v-slot:title>
                <div>
                    订单信息
                </div>
            </template>
            <template v-slot:body>
                <div class="box1">
                    <div class="box1-content">
                        <div class="box1-box">
                            <div>订单编号：5656565566541564646</div>
                            <div>用户账号：5656</div>
                            <div>发货状态：线下打款</div>
                        </div>
                        <div class="box1-box">
                            <div>付款时间：2019-03-15 12:15:26</div>
                            <div>订单可得积分：564</div>
                            <div>用户备注：请包装结实</div>
                        </div>
                        <div class="box1-box">
                            <div>付款时间：2019-03-15 12:15:26</div>
                            <div>交易号：94654654646546</div>
                        </div>
                        <div class="box1-box">
                        </div>
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
                        <div>运费险：&yen;20</div>
                        <div>应付金额： <span class="red">&yen;1866.6</span></div>
                    </div>
                </div>
            </template>
        </grey>
        <div class="readMsg">
            <div class="head">
                处理备注:
            </div>
            <textarea class="text"></textarea>
        </div>
        <div class="box1-btns">
            <el-button type="primary">确认退款</el-button>
            <el-button type="danger">拒绝退款</el-button>
        </div>
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
        overflow: hidden;
    }
    .box1-title-btn{
        font-size: 14px;
        padding: 3px 20px;
        border: 1px solid #000;
        cursor: pointer;
        float: right;
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
    .box1-content{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 0 60px;
    }
    .box1-box>div{
        line-height: 25px;
    }
    .readMsg{
        /*margin: 0 20px;*/
        /*border: 1px solid #ddd;*/
        padding: 15px 30px;
    }
    .readMsg .head{
        float: left;
        line-height: 30px;
        margin-right: 20px;
    }
    .readMsg .text{
        width: 80%;
    }
    .box1-btns{
        display: flex;
        justify-content: center;
    }
</style>
