<template>
    <div class="table-header">
        <!-- 表格头部组件 -->
        <div class="table-nav" v-if="modelState.crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>{{breadcrumb.nameA}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{breadcrumb.nameB}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="seach-class" v-if="modelState.radio">
            <span class="hj-label">条件查询:</span>
            <el-radio
                v-model="radioValue"
                v-for="(item, index) in classoption"
                :key="index"
                :label="item.id">
                {{item.name}}
            </el-radio>
        </div>
        <div class="seach-type" v-if="modelState.select">
            <span class="hj-label">{{selectTit.titS}}:</span>
            <el-select
                v-model="headerMin.typeValue"
                @change="$emit('watchSeach', headerMin)"
                placeholder="请选择"
                size="mini"
                class="hj-w120">
                <el-option
                    v-for="(item, index) in typeoption"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div  v-if="modelState.date">
            <el-date-picker
                size="mini"
                @change="getTime"
                v-model="headerMin.dateValue"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="seach-text" v-if="modelState.search">
            <el-input :placeholder="'请输入'+selectTit.titI" v-model="headerMin.seachValue"  clearable size="mini">
                <template slot="append">
                    <i class="el-icon-search" @click="$emit('watchSeach', headerMin)"></i>
                </template>
            </el-input>
        </div>
        <div class="seach-text" v-if="modelState.search2">
            <el-input :placeholder="'请输入'+selectTit.titIT" v-model="headerMin.seachValue2"  clearable size="mini">
                <template slot="append">
                    <i class="el-icon-search" @click="$emit('watchSeach', headerMin)"></i>
                </template>
            </el-input>
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
    .table-header{
        display: flex;
        justify-content: space-between;
    }
    .table-nav{
        padding-top: 5px;
    }
</style>
