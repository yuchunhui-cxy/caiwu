<template>
    <div class="orderDelive">
        <div class="box1-head">
            发货操作
        </div>
        <div class="box1-cont">
            <div class="msg">
                收货详情：李梅，15222265986，陕西省西安市西湖区XX大厦9002，邮编：000000
            </div>
            <div class="goods">
                <div>
                    国产红心火龙果750ml,1
                </div>
                <div>
                    日本进口富士苹果 500ml,1
                </div>
                <div>
                    国产红心火龙果750ml,1
                </div>
                <div>
                    国产红心火龙果XO500ml,1
                </div>
            </div>
        </div>
        <div class="box1-btns">
            <el-button type="primary">发货</el-button>
            <el-button @click="$emit('close')">取消</el-button>
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
    .orderDelive{
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .box1-head{
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #fff;
        background: #6699CC;
        text-align: center;
    }
    .box1-cont{
        padding: 20px;
    }
    .box1-cont .msg{
        line-height: 1.5;
        margin-bottom: 20px;
    }
    .box1-cont .goods{
        padding-left: 30px;
        line-height: 1.5;
    }
    .box1-btns{
        display: flex;
        justify-content: center;
    }
</style>
