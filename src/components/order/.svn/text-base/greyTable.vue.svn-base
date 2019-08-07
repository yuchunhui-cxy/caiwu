<template>
    <div class="greyBox">
        <div class="greyBox-head">
            <slot name="title"></slot>
        </div>
        <div class="greyBox-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins.js';
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
                title:'123'
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
        mixins: [ mixin ],
        props: {
            breadcrumb: {
                type: Object,
                default() {
                    return {
                        nameA: '首页',
                        nameB: '销售平台'
                    }
                }
            },
            typeoption: {
                type: Array,
                default() {
                    return [
                        {
                            label: '全部',
                            value: ''
                        }
                    ]
                }
            },
            classoption: {
                type: Array,
                default() {
                    return [
                        {
                            id: '',
                            name: '全部'
                        }
                    ]
                }
            },
            showoption: {
                type: Array,
                default() {
                    return [
                        'crumbs',
                        'radio',
                        'select',
                        'search',
                        'date'
                    ]
                }
            },
            classDefault: {
                default: 0
            },
            typeDefault: {
                default: ''
            },
            selectTit:{
                type: Object,
                default() {
                    return {
                        titS: '条件搜索',
                        titI:'内容',
                        titIT:'内容2',
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .greyBox{
        margin: 0;
        padding: 0;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .greyBox-head{
        /*background: #FAA66666;*/
        background: #6699CC;
        height: 50px;
        width: 100%;
        line-height: 50px;
        font-weight: 700;
        font-size: 18px;
        padding-left: 20px;
        box-sizing: border-box;
        color: #fff;
    }
    .greyBox-body{
        border: 1px solid #ddd;
        padding: 10px 0;
    }
</style>
