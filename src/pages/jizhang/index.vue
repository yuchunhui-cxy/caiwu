<template>
    <div>
        <div style="background: #FFF;padding: 2vh 2vw;margin-bottom: 10vh">
            <div style="font-size: 30px;color: #1C2023;text-align: center;">记账</div>
            <div style="border: 1px solid #F8F8FF;padding: 2vh 1vw;margin-top: 2vh;">
                <div style="display: flex;width: 100%;">
                    <!--左边-->
                    <div style="width: 42%;">
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                            <div style="display: flex;flex-wrap: wrap">
                                <div style="width: 250px;">
                                    <el-form-item label="日期：" prop="accountsDate">
                                        <el-date-picker style="width: 100%;" value-format="yyyy-MM-dd" type="date" placeholder="默认当前日期" v-model="form.accountsDate"></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div style="width: 250px;">
                                    <el-form-item label="方向：" prop="direction">
                                        <el-select @change="change_fangxiang" v-model="form.direction" placeholder="请选择" style="width: 100%;">
                                            <el-option label="收" value="0"></el-option>
                                            <el-option label="支" value="1"></el-option>
                                            <el-option label="转账" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div style="width: 250px;">
                                    <el-form-item label="分类：" prop="one">
                                    <el-select filterable @change="change_one" v-model="form.one" placeholder="请先选择方向" style="width: 100%;">
                                    <el-option :key="item.id" v-for="item in oneList" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                    </el-form-item>
                                    <!--<el-form-item label="分类：" prop="classify">-->
                                        <!--<el-col :span="11">-->
                                            <!--<el-select filterable @change="change_one" v-model="form.one" placeholder="请先选择方向" style="width: 100%;">-->
                                                <!--<el-option :key="item.id" v-for="item in one" :label="item.name" :value="item.id"></el-option>-->
                                            <!--</el-select>-->
                                        <!--</el-col>-->
                                        <!--<el-col :span="11" :offset="2">-->
                                            <!--<el-select filterable @change="change_two" v-model="form.classify" placeholder="请先选择一级分类" style="width: 100%;">-->
                                                <!--<el-option :key="item.id" v-for="item in two" :label="item.name" :value="item"></el-option>-->
                                            <!--</el-select>-->
                                        <!--</el-col>-->
                                    <!--</el-form-item>-->
                                </div>
                                <div style="width: 250px;">
                                    <el-form-item label="" prop="">
                                        <el-select filterable @change="change_two" v-model="form.classify" placeholder="请先选择一级分类" style="width: 100%;">
                                        <el-option :key="item.id" v-for="item in two" :label="item.name" :value="item"></el-option>
                                    </el-select>
                                    </el-form-item>
                                </div>
                                <div style="width: 250px;">
                                    <el-form-item label="金额：" prop="money">
                                        <el-input v-model="form.money" style="width: 100%;" placeholder="请输入金额"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="width: 250px;">
                                    <el-form-item label="支付状态：" label-width="100px" prop="type">
                                        <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
                                            <el-option label="已付" value="1"></el-option>
                                            <el-option label="未付" value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div style="width: 500px;">
                                    <el-form-item label="描述：" prop="comment">
                                        <el-input v-model="form.comment" style="width: 100%;" placeholder="请输入描述"></el-input>
                                        <div style="font-size: 14px;color: #40454B;">手机端可语音记账，方便快捷</div>
                                    </el-form-item>
                                </div>
                                <div style="width: 500px;">
                                    <el-form-item label="交易方式：" prop="payMoney">
                                        <el-select v-model="form.payMoney" placeholder="请选择" style="width: 100%;">
                                            <el-option label="银行转账" value="0"></el-option>
                                            <el-option label="现金支付" value="1"></el-option>
                                            <el-option label="微信（公司账号）" value="2"></el-option>
                                            <el-option label="微信（法人个人账号）" value="3"></el-option>
                                            <el-option label="支付宝（公司账号）" value="4"></el-option>
                                            <el-option label="支付宝（法人个人账号）" value="5"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div style="width: 500px;">
                                    <el-form-item label="交易对象：">
                                        <el-col :span="18">
                                            <el-select style="width: 100%;" filterable v-model="form.payUser" placeholder="模糊匹配业务伙伴，必须点击选择">
                                                <el-option
                                                        v-for="item in list"
                                                        :key="item.supplierName"
                                                        :label="item.supplierName"
                                                        :value="item.supplierName">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="4" :offset="2">
                                            <el-button @click="add_huoban" type="" icon="el-icon-plus"></el-button>
                                        </el-col>
                                    </el-form-item>
                                </div>
                                <div style="width: 600px;">
                                    <el-form-item label="">
                                    <div  v-if="!$route.query.accountingId" style="font-size: 14px;color: #40454B;">管理业务伙伴可以便捷查看往来记录</div>
                                </el-form-item>
                                </div>
                                <div style="width: 600px;"  v-if="!$route.query.accountingId">
                                    <el-form-item label="">
                                        <el-checkbox @change="shengchengpingzheng" v-model="form.checked">生成凭证</el-checkbox>
                                        <div style="font-size: 10px">管理凭证可生成财务报表直接用于报税，并解锁完整财务分析</div>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form>
                        <!--添加-->
                        <div style="display: flex;justify-content: space-around" v-if="!$route.query.accountingId">
                            <el-button type="warning" @click="test(true)">保存并添加下一条</el-button>
                            <el-button type="warning" @click="test(false)">保存并返回</el-button>
                            <el-button type="info" @click="goBack">返回</el-button>
                        </div>
                        <!--编辑-->
                        <div style="display: flex;justify-content: space-around" v-if="$route.query.accountingId">
                            <el-button type="warning" @click="submitForm1('form')">保存</el-button>
                            <el-button type="info" @click="goBack">返回</el-button>
                        </div>
                    </div>

                    <!--右边-->
                    <div style="width: 100%;margin-left: 1vw;" v-show="form.checked">
                        <div style="overflow-x: auto;width: 100%;white-space: nowrap;">
                                <el-form :inline="true" :model="form" style="display: inline-block;vertical-align: top">
                                    <el-form-item label="凭证字号：">
                                        <el-input v-model="form.search" placeholder=""></el-input>
                                    </el-form-item>
                                    <el-form-item label="号">
                                    </el-form-item>
                                </el-form>
                                <el-button type="" @click="shangchuan_fapiao">上传票据</el-button>
                                <el-button type="" @click="congxianyoupiaojuxuanze">从现有票据选择</el-button>
                        </div>

                        <!--右下的表格-->
                        <div style="margin-top: 2vh;">
                            <el-form :model="user" ref="user">
                            <el-table
                                    :data="user.tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop=""
                                        label="科目"
                                        width="180">

                                    <template slot-scope="scope">
                                        <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.name'" :rules="[{ required: true, message: '请输入科目', trigger: 'change' }]">
                                            <el-select filterable v-model="scope.row.name" placeholder="请选择" style="width: 100%;">
                                                <el-option :key="item.id" v-for="item in accountantSubject" :label="item.subjects_name" :value="item.subjects_name+'-'+item.subjects_number"></el-option>
                                            </el-select>
                                        </el-form-item>

                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="摘要"
                                        width="180">
                                    <template slot-scope="scope">
                                        <el-form-item style="margin-bottom: 0" label="" :prop="'tableData.' + scope.$index +'.zhaiyao'" :rules="[{ required: true, message: '请输入摘要', trigger: 'blur' }]">
                                            <el-input v-model="scope.row.zhaiyao" placeholder=""></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="借方金额">
                                    <template slot-scope="scope">
                                        <el-input @input="jie_change(scope.row)" :disabled="scope.row.jie_show" v-model="scope.row.jie" placeholder=""></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="贷方金额">
                                    <template slot-scope="scope">
                                        <el-input @input="dai_change(scope.row)" :disabled="scope.row.dai_show" v-model="scope.row.dai" placeholder=""></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="add" type="text" size="small">增加</el-button>
                                        <el-button v-if="user.tableData.length !=2" @click="del(scope.row.index)" type="text" size="small">删除</el-button>

                                    </template>
                                </el-table-column>
                            </el-table>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--从现有票据选择-->
        <el-dialog title="" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-table :data="tableData1">
                <el-table-column
                        prop=""
                        label="单选"
                        width="60">
                    <template slot-scope="scope">
                        <el-radio v-model="multi" :label="scope.row.id">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="creation_time"
                        label="上传时间"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="company_invoice_number"
                        label="发票号码"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="company_supplier_name"
                        label="供应商/客户名称"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="price_tax_total"
                        label="价税合计"
                        width="">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible_cancel">取 消</el-button>
                <el-button type="primary" @click="dialogVisible_ok">确 定</el-button>
             </span>
        </el-dialog>

        <!--为固定资产时-->
        <el-dialog title="" :visible.sync="dialogVisible1" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form :model="form" label-width="150px">
                <div style="display: flex;flex-wrap: wrap">
                        <div style="width: 450px;">
                            <el-form-item label="资产名称：">
                                <el-input v-model="form.assetName" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="资产类别：">
                                <el-select v-model="form.assetClassify" placeholder="请选择" style="width: 100%;">
                                    <el-option label="房屋建筑物" value="1"></el-option>
                                    <el-option label="机器机械生产设备" value="2"></el-option>
                                    <el-option label="器具、工具、家具" value="3"></el-option>
                                    <el-option label="运输工具" value="4"></el-option>
                                    <el-option label="电子设备" value="5"></el-option>
                                    <el-option label="其他固定资产" value="6"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="开始使用日期：">
                                <el-date-picker style="width: 100%;" value-format="yyyy-MM-dd" type="date" placeholder="默认当前日期" v-model="form.startDate"></el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="选择科目：">
                                <el-select v-model="form.assetSubjects" placeholder="请选择" style="width: 100%;">
                                    <el-option :key="item.subjects_name" v-for="item in subject" :label="item.subjects_name" :value="item.subjects_name"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="资产原值：">
                                <el-input v-model="form.zMoeny" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="企业类别：">
                                <el-select v-model="form.flag" placeholder="请选择" style="width: 100%;">
                                    <el-option label="内资" value="0"></el-option>
                                    <el-option label="外资" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="残值率：">
                                <el-input v-model="form.residualValue" auto-complete="off" style="width: 100%;"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="预计使用月份：">
                                <el-input v-model="form.setMonth" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="已折旧月份：">
                                <el-input v-model="form.getMonth" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <!--<div style="width: 45%;">-->
                            <!--<el-form-item label="剩余使用月份：">-->
                                <!--<el-input v-model="form" auto-complete="off"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
                        <div style="width: 450px;">
                            <el-form-item label="累计折旧：">
                                <el-input v-model="form.setZMoney" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <div style="width: 450px;">
                            <el-form-item label="减值准备：">
                                <el-input v-model="form.getZMoney" auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <!--<div style="width: 45%;">-->
                            <!--<el-form-item label="每月折旧额：">-->
                                <!--<el-input v-model="form" auto-complete="off"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
                    </div>
                </el-form>
            <span slot="footer">
                <!--<el-button @click="dialogVisible1 = false">取 消</el-button>-->
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
             </span>
        </el-dialog>
        <!--<prompt></prompt>-->

        <!--上传发票的弹框-->
        <el-dialog
                :close-on-click-modal="false" :close-on-press-escape="false"
                title="上传发票"
                :visible.sync="shangchuan_fapiao_kaiguan"
                width="50%">
            <el-form ref="duihuakuang_fapiao" :model="duihuakuang_fapiao" label-width="150px" :rules="fapiao_rules">
                <div style="display: flex;flex-wrap: wrap">
                    <div style="width: 100%;">
                        <el-form-item label="" label-width="50px">
                            <el-upload :on-change="change" action="" :show-file-list="false" :auto-upload="false">
                                <el-button type="warning">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div style="width: 300px;">
                        <el-form-item label="发票类型：" prop="invoiceType">
                            <el-select v-model="duihuakuang_fapiao.invoiceType" placeholder="请选择" style="width: 100%;">
                                <el-option label="专票" value="0"></el-option>
                                <el-option label="普票" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div style="width: 300px;">
                        <el-form-item label="开票日期：" prop="invoicingDate">
                            <el-date-picker style="width: 100%;" type="date" placeholder="" v-model="duihuakuang_fapiao.invoicingDate" value-format="yyyy-MM-dd"></el-date-picker>

                        </el-form-item>
                    </div>
                    <div style="width: 300px;">
                        <el-form-item label="认证日期：">
                            <el-date-picker style="width: 100%;" type="date" placeholder="" v-model="duihuakuang_fapiao.authenticationDate" value-format="yyyy-MM-dd"></el-date-picker>

                        </el-form-item>
                    </div>
                    <div style="width: 300px;">
                        <el-form-item label="发票号码：" prop="invoiceNumber">
                            <el-input v-model="duihuakuang_fapiao.invoiceNumber" style="width: 100%;"></el-input>
                        </el-form-item>
                    </div>

                    <!--<div style="width: 100%;display: flex;flex-wrap: wrap">-->
                        <div style="width: 300px;">
                            <el-form-item label="供应商/客户类型：" prop="supplierType">
                                <el-select v-model="duihuakuang_fapiao.supplierType" placeholder="请选择" style="width: 100%;">
                                    <el-option label="供应商" value="供应商"></el-option>
                                    <el-option label="客户" value="客户"></el-option>
                                </el-select>

                            </el-form-item>
                        </div>
                        <div style="width: 300px;">
                            <el-form-item label="供应商/客户名称：" prop="supplierName">
                                <el-select v-model="duihuakuang_fapiao.supplierName" placeholder="请选择" style="width: 100%;">
                                    <el-option v-for="item in list" :key="item.company_supplier_name" :label="item.company_supplier_name" :value="item.company_supplier_name"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    <!--</div>-->

                    <div style="width: 300px;">
                        <el-form-item label="金额：" prop="money">
                            <el-input v-model="duihuakuang_fapiao.money" style="width: 100%;"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 300px;">
                        <el-form-item label="税率：" prop="taxRate">
                            <el-input v-model="duihuakuang_fapiao.taxRate" style="width: 100%;"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 300px;">
                        <el-form-item label="价税合计：" prop="priceTaxTotal">
                            <el-input v-model="duihuakuang_fapiao.priceTaxTotal" style="width: 100%;"></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 30px;">
                        <el-form-item label="元" label-width="30px">
                        </el-form-item>
                    </div>
                </div>
                <div style="margin: 2vh">
                    <img :src="duihuakuang_fapiao.invoicePhoto" style="width: 300px;">
                </div>
                <div style="width: 90%;text-align: right;">
                    <el-form-item>
                        <el-button @click="shangchuan_fapiao_kaiguan = false">取 消</el-button>
                        <el-button type="primary" @click="duihuakuang_fapiao_ok">确 定</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-dialog>

        <addHuoBan v-if="show_huoban" @add_huoban_ok = "add_huoban_ok"></addHuoBan>


    </div>
</template>

<script>
    import mix from "@/mixins/mixins"
    import OSS from 'ali-oss'
    import addHuoBan from "@/components/yuchunhui/add_yewuhuoban"

    export default {
        name: "xianjinliuliangbiao",
        inject:['reload'],
        mixins:[mix],
        filter:{

        },
        watch:{
            'form.comment':{
                handler(n){
                    this.user= {
                        tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                            {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                    }
                    // 第一二行的摘要
                    this.user.tableData[0].zhaiyao = this.form.comment
                    this.user.tableData[1].zhaiyao = this.form.comment
                    // 第一行的科目
                    if(this.two.length != 0){
                        const y = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.classify
                        })
                        console.log(y,111)
                        this.user.tableData[0].name = this.form.classify + '-' +y.subjects_number

                    }else if(this.two.length == 0){
                        const x = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.one
                        })
                        this.user.tableData[0].name = this.form.one + '-' + x.subjects_number
                    }
                    // 第二行科目(已付的情况下)由交易方式决定
                    if(this.form.type == 1){
                        if(this.form.payMoney == 0){
                            this.user.tableData[1].name = "银行转账-100201"

                        }else if(this.form.payMoney == 1){
                            this.user.tableData[1].name = "库存现金-1001"

                        }else if(this.form.payMoney == 2){
                            this.user.tableData[1].name = "微信公司账户-100203"

                        }else if(this.form.payMoney == 3){
                            this.user.tableData[1].name = "微信法人账户-101202"

                        }else if(this.form.payMoney == 4){
                            this.user.tableData[1].name = "支付宝公司账户-100202"

                        }else if(this.form.payMoney == 5){
                            this.user.tableData[1].name = "支付宝法人账户-101201"
                        }
                        // (未付的情况下)由收支决定
                    }else if(this.form.type == 0){
                        if(this.form.direction == 0){
                            this.user.tableData[1].name = "应收账款-112201"
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].name = "应付账款-2202"
                        }
                    }
                    // 第二行的金额:収(0)贷,支(1)借,第一行与第二行相反
                    if(this.form.direction == 1){
                        this.user.tableData[1].dai_show = true
                        this.user.tableData[1].jie = this.form.money

                        this.user.tableData[0].jie_show = true
                        this.user.tableData[0].dai = this.form.money

                    }else if(this.form.direction == 0){
                        this.user.tableData[1].jie_show = true
                        this.user.tableData[1].dai = this.form.money

                        this.user.tableData[0].dai_show = true
                        this.user.tableData[0].jie = this.form.money

                    }
                }
            },
            // 第一行和第二行的钱位置相反
            'form.money':{
                handler(n){
                    this.user= {
                        tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                            {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                    }
                    // 第一二行的摘要
                    this.user.tableData[0].zhaiyao = this.form.comment
                    this.user.tableData[1].zhaiyao = this.form.comment
                    // 第一行的科目
                    if(this.two.length != 0){
                        const y = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.classify
                        })
                        this.user.tableData[0].name = this.form.classify + '-' +y.subjects_number

                    }else if(this.two.length == 0){
                        const x = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.one
                        })
                        this.user.tableData[0].name = this.form.one + '-' + x.subjects_number
                    }
                    // 第二行科目(已付的情况下)由交易方式决定
                    if(this.form.type == 1){
                        if(this.form.payMoney == 0){
                            this.user.tableData[1].name = "银行转账-100201"

                        }else if(this.form.payMoney == 1){
                            this.user.tableData[1].name = "库存现金-1001"

                        }else if(this.form.payMoney == 2){
                            this.user.tableData[1].name = "微信公司账户-100203"

                        }else if(this.form.payMoney == 3){
                            this.user.tableData[1].name = "微信法人账户-101202"

                        }else if(this.form.payMoney == 4){
                            this.user.tableData[1].name = "支付宝公司账户-100202"

                        }else if(this.form.payMoney == 5){
                            this.user.tableData[1].name = "支付宝法人账户-101201"
                        }
                        // (未付的情况下)由收支决定
                    }else if(this.form.type == 0){
                        if(this.form.direction == 0){
                            this.user.tableData[1].name = "应收账款-112201"
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].name = "应付账款-2202"
                        }
                    }
                    // 第二行的金额:収(0)贷,支(1)借,第一行与第二行相反
                    if(this.form.direction == 1){
                        this.user.tableData[1].dai_show = true
                        this.user.tableData[1].jie = this.form.money

                        this.user.tableData[0].jie_show = true
                        this.user.tableData[0].dai = this.form.money

                    }else if(this.form.direction == 0){
                        this.user.tableData[1].jie_show = true
                        this.user.tableData[1].dai = this.form.money

                        this.user.tableData[0].dai_show = true
                        this.user.tableData[0].jie = this.form.money

                    }
                }
            },
            // 第一行的科目

            'form.classify':{

                handler(n){
                    this.user= {
                        tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                            {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                    }
                    // 第一二行的摘要
                    this.user.tableData[0].zhaiyao = this.form.comment
                    this.user.tableData[1].zhaiyao = this.form.comment
                    // 第一行的科目
                    if(this.two.length != 0){
                        const y = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.classify
                        })
                        this.user.tableData[0].name = this.form.classify + '-' +y.subjects_number

                    }else if(this.two.length == 0){
                        const x = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.one
                        })
                        this.user.tableData[0].name = this.form.one + '-' + x.subjects_number
                    }
                    // 第二行科目(已付的情况下)由交易方式决定
                    if(this.form.type == 1){
                        if(this.form.payMoney == 0){
                            this.user.tableData[1].name = "银行转账-100201"

                        }else if(this.form.payMoney == 1){
                            this.user.tableData[1].name = "库存现金-1001"

                        }else if(this.form.payMoney == 2){
                            this.user.tableData[1].name = "微信公司账户-100203"

                        }else if(this.form.payMoney == 3){
                            this.user.tableData[1].name = "微信法人账户-101202"

                        }else if(this.form.payMoney == 4){
                            this.user.tableData[1].name = "支付宝公司账户-100202"

                        }else if(this.form.payMoney == 5){
                            this.user.tableData[1].name = "支付宝法人账户-101201"
                        }
                        // (未付的情况下)由收支决定
                    }else if(this.form.type == 0){
                        if(this.form.direction == 0){
                            this.user.tableData[1].name = "应收账款-112201"
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].name = "应付账款-2202"
                        }
                    }
                    // 第二行的金额:収(0)贷,支(1)借,第一行与第二行相反
                    if(this.form.direction == 1){
                        this.user.tableData[1].dai_show = true
                        this.user.tableData[1].jie = this.form.money

                        this.user.tableData[0].jie_show = true
                        this.user.tableData[0].dai = this.form.money

                    }else if(this.form.direction == 0){
                        this.user.tableData[1].jie_show = true
                        this.user.tableData[1].dai = this.form.money

                        this.user.tableData[0].dai_show = true
                        this.user.tableData[0].jie = this.form.money

                    }

                }
            },
            'form.type':{
                handler(){
                    this.user= {
                        tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                            {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                    }
                    // 第一二行的摘要
                    this.user.tableData[0].zhaiyao = this.form.comment
                    this.user.tableData[1].zhaiyao = this.form.comment
                    // 第一行的科目
                    if(this.two.length != 0){
                        const y = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.classify
                        })
                        this.user.tableData[0].name = this.form.classify + '-' +y.subjects_number

                    }else if(this.two.length == 0){
                        const x = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.one
                        })
                        this.user.tableData[0].name = this.form.one + '-' + x.subjects_number
                    }
                    // 第二行科目(已付的情况下)由交易方式决定
                    if(this.form.type == 1){
                        if(this.form.payMoney == 0){
                            this.user.tableData[1].name = "银行转账-100201"

                        }else if(this.form.payMoney == 1){
                            this.user.tableData[1].name = "库存现金-1001"

                        }else if(this.form.payMoney == 2){
                            this.user.tableData[1].name = "微信公司账户-100203"

                        }else if(this.form.payMoney == 3){
                            this.user.tableData[1].name = "微信法人账户-101202"

                        }else if(this.form.payMoney == 4){
                            this.user.tableData[1].name = "支付宝公司账户-100202"

                        }else if(this.form.payMoney == 5){
                            this.user.tableData[1].name = "支付宝法人账户-101201"
                        }
                        // (未付的情况下)由收支决定
                    }else if(this.form.type == 0){
                        if(this.form.direction == 0){
                            this.user.tableData[1].name = "应收账款-112201"
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].name = "应付账款-2202"
                        }
                    }
                    // 第二行的金额:収(0)贷,支(1)借,第一行与第二行相反
                    if(this.form.direction == 1){
                        this.user.tableData[1].dai_show = true
                        this.user.tableData[1].jie = this.form.money

                        this.user.tableData[0].jie_show = true
                        this.user.tableData[0].dai = this.form.money

                    }else if(this.form.direction == 0){
                        this.user.tableData[1].jie_show = true
                        this.user.tableData[1].dai = this.form.money

                        this.user.tableData[0].dai_show = true
                        this.user.tableData[0].jie = this.form.money

                    }
                }
            },
            'form.payMoney':{
                handler(){
                    this.user= {
                        tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                            {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                    }
                    // 第一二行的摘要
                    this.user.tableData[0].zhaiyao = this.form.comment
                    this.user.tableData[1].zhaiyao = this.form.comment
                    // 第一行的科目
                    if(this.two.length != 0){
                        const y = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.classify
                        })
                        this.user.tableData[0].name = this.form.classify + '-' +y.subjects_number

                    }else if(this.two.length == 0){
                        const x = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.one
                        })
                        this.user.tableData[0].name = this.form.one + '-' + x.subjects_number
                    }
                    // 第二行科目(已付的情况下)由交易方式决定
                    if(this.form.type == 1){
                        if(this.form.payMoney == 0){
                            this.user.tableData[1].name = "银行转账-100201"

                        }else if(this.form.payMoney == 1){
                            this.user.tableData[1].name = "库存现金-1001"

                        }else if(this.form.payMoney == 2){
                            this.user.tableData[1].name = "微信公司账户-100203"

                        }else if(this.form.payMoney == 3){
                            this.user.tableData[1].name = "微信法人账户-101202"

                        }else if(this.form.payMoney == 4){
                            this.user.tableData[1].name = "支付宝公司账户-100202"

                        }else if(this.form.payMoney == 5){
                            this.user.tableData[1].name = "支付宝法人账户-101201"
                        }
                        // (未付的情况下)由收支决定
                    }else if(this.form.type == 0){
                        if(this.form.direction == 0){
                            this.user.tableData[1].name = "应收账款-112201"
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].name = "应付账款-2202"
                        }
                    }
                    // 第二行的金额:収(0)贷,支(1)借,第一行与第二行相反
                    if(this.form.direction == 1){
                        this.user.tableData[1].dai_show = true
                        this.user.tableData[1].jie = this.form.money

                        this.user.tableData[0].jie_show = true
                        this.user.tableData[0].dai = this.form.money

                    }else if(this.form.direction == 0){
                        this.user.tableData[1].jie_show = true
                        this.user.tableData[1].dai = this.form.money

                        this.user.tableData[0].dai_show = true
                        this.user.tableData[0].jie = this.form.money

                    }
                }
            },
            'form.direction':{
                handler(){
                    this.user= {
                        tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                            {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                    }
                    // 第一二行的摘要
                    this.user.tableData[0].zhaiyao = this.form.comment
                    this.user.tableData[1].zhaiyao = this.form.comment
                    // 第一行的科目
                    if(this.two.length != 0){
                        const y = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.classify
                        })
                        this.user.tableData[0].name = this.form.classify + '-' +y.subjects_number

                    }else if(this.two.length == 0){
                        const x = this.accountantSubject.find(item=>{
                            return item.subjects_name == this.form.one
                        })
                        this.user.tableData[0].name = this.form.one + '-' + x.subjects_number
                    }
                    // 第二行科目(已付的情况下)由交易方式决定
                    if(this.form.type == 1){
                        if(this.form.payMoney == 0){
                            this.user.tableData[1].name = "银行转账-100201"

                        }else if(this.form.payMoney == 1){
                            this.user.tableData[1].name = "库存现金-1001"

                        }else if(this.form.payMoney == 2){
                            this.user.tableData[1].name = "微信公司账户-100203"

                        }else if(this.form.payMoney == 3){
                            this.user.tableData[1].name = "微信法人账户-101202"

                        }else if(this.form.payMoney == 4){
                            this.user.tableData[1].name = "支付宝公司账户-100202"

                        }else if(this.form.payMoney == 5){
                            this.user.tableData[1].name = "支付宝法人账户-101201"
                        }
                        // (未付的情况下)由收支决定
                    }else if(this.form.type == 0){
                        if(this.form.direction == 0){
                            this.user.tableData[1].name = "应收账款-112201"
                        }else if(this.form.direction == 1){
                            this.user.tableData[1].name = "应付账款-2202"
                        }
                    }
                    // 第二行的金额:収(0)贷,支(1)借,第一行与第二行相反
                    if(this.form.direction == 1){
                        this.user.tableData[1].dai_show = true
                        this.user.tableData[1].jie = this.form.money

                        this.user.tableData[0].jie_show = true
                        this.user.tableData[0].dai = this.form.money

                    }else if(this.form.direction == 0){
                        this.user.tableData[1].jie_show = true
                        this.user.tableData[1].dai = this.form.money

                        this.user.tableData[0].dai_show = true
                        this.user.tableData[0].jie = this.form.money

                    }
                }
            }
        },
        mounted(){
            this.getStorage()
            // 修改
            if(this.$route.query.accountingId){
                // 返显的信息
                this._ajax('userAccounts/selectFlowingWaterOne',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    accountingId:this.$route.query.accountingId
                }, msg => {
                    // 方向
                    var idOne = msg.idOne
                    var direction = msg.direction

                    this.form.accountsDate = msg.accounts_date
                    this.form.direction = msg.direction
                    this.form.classify = msg.classify
                    this.form.money = msg.money
                    this.form.type = msg.type
                    this.form.comment = msg.comment
                    this.form.accountsDate = msg.accounts_date
                    this.form.payMoney = msg.pay_money
                    this.form.payUser = msg.pay_user
                    this.form.subjectId = msg.subject_id

                    this.form.one = idOne

                    this.parentId = idOne


                    this._ajax('userAccounts/selectSubjectsDictionary',{
                        uuid:this.uuid,
                        accountId:this.accountId,
                        name:'',
                        flag:direction
                    }, msg => {
                        this.oneList = msg

                        // this._message(1,"一级分类成功")
                    })

                    this._ajax('userAccounts/selectSubjects2Dictionary',{
                        uuid:this.uuid,
                        accountId:this.accountId,
                        id:idOne,
                        flag:direction,
                        name:''
                    }, msg => {
                        this.two = msg
                        // this.parentId = msg[0].parent_id
                        // this.form.subjectId = msg.id
                        // this._message(1,"二级分类成功")
                    })


                    // this._message(1,"反显成功")
                })
            }
            this._ajax('userAccounts/selectCompanySupplierName',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                company_supplier_name:this.form.payUser
            }, msg => {
                this.list = msg
                // this._message(1,"交易对象成功")
            })


            this._ajax('userHomePage/selectCertificateNumber',{
                uuid:this.uuid,
                workAccountId:this.accountId,
                time:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date().getDate()).slice(-2),
            }, msg => {
                this.form.search = msg.number
                // this._message(1,"凭证字号成功")
            })
            this._ajax('userAccounts/selectClassName',{
                uuid:this.uuid,
                workAccountID:this.accountId,
                name:''
            }, msg => {
                this.accountantSubject = msg
                // this._message(1,"会计科目成功")
            })
        },
        components:{
            addHuoBan
        },
        data() {
            return {
                show_huoban:false,

                invoicePhoto1:"",
                duihuakuang_fapiao:{
                    // 发票类型
                    invoiceType:'',
                    // 开票日期
                    invoicingDate:'',
                    // 认证日期
                    authenticationDate:'',
                    // 发票号码
                    invoiceNumber:'',
                    // 供应商或客户
                    supplierType:"",
                    // 供应商或客户的名字
                    supplierName:'',
                    // 金额
                    money:'',
                    // 税率
                    taxRate:'',
                    // 价税合计
                    priceTaxTotal:'',
                    // 图片
                    invoicePhoto:""
                },
                shangchuan_fapiao_kaiguan:false,
                // 验证多个表单
                formArr:['form'],

                multi:"",
                // 增加的索引
                index:1,
                // 贷方金额和借方金额只能传一个
                totalDebitMoney_if_show:false,
                totalCreditMoney_if_show:false,
                // 会计科目
                accountantSubject:[],
                // 科目
                subject:[],
                // 交易对象
                list:[],
                // 一级分类
                oneList:[],
                // 二级的分类
                two:[],
                parentId:"",
                // 固定资产时
                dialogVisible1:false,
                // 从现有发票选择
                dialogVisible:false,
                // 从现有发票选择
                tableData1:[],
                page:1,
                pageSize:10,
                total:10,
                user:{
                    tableData: [{name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:0},
                        {name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:1}],
                },

                form:{
                    subjectId:'',

                    // 是否生成凭证
                    checked:false,
                    // 凭证字号
                    search:'',

                    // 左边的
                    accountsDate:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + new Date().getDate()).slice(-2),
                    direction:"",
                    classify:'',
                    one:'',
                    money:"",
                    comment:"",
                    payMoney:'',
                    payUser:'',
                    // 支付状态
                    type:'',

                    // 如果是固定资产
                    assetName:'',
                    assetClassify:"",
                    startDate:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2) + '-' + (Array(2).join(0) + (Number(new Date().getDate()))).slice(-2),
                    zMoeny:0,
                    flag:'',
                    residualValue:'',
                    setMonth:'',
                    getMonth:'',
                    setZMoney:0,
                    getZMoney:0,
                    assetSubjects:"",
                },
                rules: {
                    accountsDate: [
                        { required: true, message: '请选择日期', trigger: 'change' },
                    ],
                    direction: [
                        { required: true, message: '请选择方向', trigger: 'change' },
                    ],
                    one: [
                        { required: true, message: '请选择分类一', trigger: 'change' },
                    ],
                    classify: [
                        { required: true, message: '请选择分类二', trigger: 'change' },
                    ],
                    money: [
                        { required: true, message: '请输入金额', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择支付方式', trigger: 'change' },
                    ],
                    comment: [
                        { required: true, message: '请输入描述', trigger: 'blur' },
                    ],
                    payMoney: [
                            { required: true, message: '请选择交易方式', trigger: 'change' },
                    ],
                },
                fapiao_rules: {
                    invoiceType: [
                        { required: true, message: '请选择发票类型', trigger: 'change' },
                    ],
                    invoicingDate: [
                        { required: true, message: '请选择开票日期', trigger: 'change' }
                    ],
                    invoiceNumber:[
                        { required: true, message: '请输入发票号码', trigger: 'blur' }
                    ],
                    supplierType:[
                        { required: true, message: '请选择供应商或客户', trigger: 'change' }
                    ],
                    supplierName:[
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    supplierType:[
                        { required: true, message: '请选择供应商或客户', trigger: 'change' }
                    ],
                    money:[
                        { required: true, message: '请输入金额', trigger: 'blur' }
                    ],
                    taxRate:[
                        { required: true, message: '请输入税率', trigger: 'blur' }
                    ],
                    priceTaxTotal:[
                        { required: true, message: '请选择价税合计', trigger: 'blur' }
                    ],
                },

            }
        },
        methods: {
            add_huoban_ok(){
                this._ajax('userAccounts/selectCompanySupplierName',{
                    company_supplier_name:'',
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                }, msg => {
                    this.list = msg
                    this.show_huoban = false
                })
            },
            add_huoban(){
                this.show_huoban = true
                // this.$router.push({path: '/home/gongyingshangkehu/add_set',query:{type:'add'}})
            },


            duihuakuang_fapiao_ok(){
                this.$refs['duihuakuang_fapiao'].validate((valid) => {
                    if (valid) {
                        this.multi = "shangchuan"
                        // sessionStorage.setItem("fapiao",JSON.stringify(this.duihuakuang_fapiao))
                        // sessionStorage.setItem("type1","shangchuan_fapiao")
                        this.shangchuan_fapiao_kaiguan = false
                    }else{
                        this.form.checked = false
                        return false;
                    }
                })

            },
            // 上传文件
            change (file) {
                 var a = this.$message({
                    type:"warning",
                    message:'发票识别中请稍后',
                    duration:0
                })
                function blobToDataURL(blob, callback) {
                    var a = new FileReader();
                    a.onload = function (e) { callback(e.target.result); }
                    a.readAsDataURL(blob);
                }
                blobToDataURL(file.raw,  (dataurl)=> {
                    // this.form.invoicePhoto = dataurl
                    this._ajax('common/invoice',{
                        encode:JSON.stringify(dataurl.split(",")[1])
                    }, msg => {

                        this.duihuakuang_fapiao.invoicePhoto = this.invoicePhoto1

                        this.duihuakuang_fapiao.invoiceId = msg.kind
                        this.duihuakuang_fapiao.invoiceNumber = msg.number
                        this.duihuakuang_fapiao.priceTaxTotal = msg.total
                        this.duihuakuang_fapiao.money = msg.pretax_amount
                        // 供生成使用
                        // this.form.a = msg.tax

                        // 税率
                        this.duihuakuang_fapiao.taxRate = (((msg.tax/msg.pretax_amount).toFixed(2))*100)+ '%'

                        let x = ""
                        msg.date.split("").forEach((item,index)=>{
                            if(item == "年" || item == "月" || item =="日"){
                                if(index != (msg.date.split("").length)-1){
                                    x+="-"

                                }

                            }else{
                                x+=item
                            }
                        })
                        this.duihuakuang_fapiao.invoicingDate = x
                        a.close()
                        this._message(1,"识别成功")
                    })

                });


                var _this = this;
                if (file == undefined) {
                    return false;
                }
                var fName = file.name,
                    suffix = fName.substr(fName.lastIndexOf(".")),
                    nda = 'user-herder' + Date.parse(new Date()) / 1000,
                    storeAs = nda + suffix;
                var client = new OSS.Wrapper(this.$ali);
                client.multipartUpload(storeAs, file.raw).then(function (result) {
                    // console.log(result.res.requestUrls[0])
                    _this.invoicePhoto1 = result.res.requestUrls[0].split('?')[0];
                    // _this.$message({
                    //     message: '上传成功',
                    //     type: 'success'
                    // });

                }).catch(function (err) {
                    console.log(err);
                    _this.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });

            },
            shangchuan_fapiao(){
                this.shangchuan_fapiao_kaiguan = true
            },
            shengchengpingzheng(value){
                if(value){
                    this.formArr.push("user")

                    this.$refs['form'].validate((valid) => {
                            if (valid) {
                                // 有第二个分类的必选第二分类
                                if(this.two.length != 0 && this.form.classify == ""){
                                    this._message(2,"请选择二级分类")
                                    this.form.checked = false
                                    return
                                }
                            }else{
                                this._message(2,"请先将流水填写完整")
                                this.form.checked = false
                                return false;
                            }
                    })
                }
            },


            test(type){
                // 有第二个分类的必选第二分类
                if(this.two.length != 0 && this.form.classify == ""){
                    this._message(2,"请选择二级分类")
                    return
                }
                if(this.form.checked){
                    if(isNaN(Number(this.form.search)) || Number(this.form.search) <=0){
                        this._message(2,"凭证字号格式不正确")
                        return
                    }

                    // 判断信息是否填写完整
                    var jie_num = 0
                    var dai_num = 0

                    let error = false
                    this.user.tableData.forEach(item=>{
                        if(item.jie == "" && item.dai ==""){
                            error = true
                            return
                        }

                        if(item.jie != ""){
                            jie_num += Number(item.jie)
                        }
                        if(item.dai != ""){
                            dai_num += Number(item.dai)
                        }
                        // jie_num += Number(item.jie)
                        // dai_num += Number(item.dai)
                    })

                    if(error && this.form.checked){
                        this._message(2,"请将借贷信息填写完整")
                        return
                    }
                }

                var resultArr=[]//用来接受返回结果的数组
                var _self=this
                function checkForm(formName) { //封装验证表单的函数
                    var result = new Promise(function(resolve, reject) {
                        _self.$refs[formName].validate((valid) => {
                            if (valid) {
                                resolve();
                            } else {
                                reject()
                            }
                        })
                    })
                    resultArr.push(result) //push 得到promise的结果
                }
                this.formArr.forEach(item => { //根据表单的ref校验
                    checkForm(item)
                })

                Promise.all(resultArr).then(() => { //都通过了
                    // alert('恭喜你，表单全部验证通过啦')


                    // 如果只添加流水
                    if(!this.form.checked){
                        this._ajax('userAccounts/addFlowingWater',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,
                            ...this.form,
                            parentId:this.parentId,


                        }, msg => {
                            this._message(1,"保存流水成功")
                            if(type){
                                this.reload()
                            }
                            if(!type){
                                this.$router.push({path: "/home"})
                            }
                        })
                    }else{

                        // 判断是否借贷平衡
                        if(jie_num != dai_num){
                            this._message(2,"借贷不平衡")
                            return
                        }

                        var certificateAbstract = ''
                        var totalDebitMoney = ''
                        var totalCreditMoney = ''
                        var accountantSubject = ''
                        var accountantCode = ''

                        this.user.tableData.forEach(item=>{
                            certificateAbstract += item.zhaiyao + ','

                            if(item.jie == ''){
                                totalDebitMoney+= 0+','
                            }else{
                                totalDebitMoney+= item.jie+','
                            }
                            if(item.dai == ''){
                                totalCreditMoney+= 0+','
                            }else{
                                totalCreditMoney+= item.dai+','
                            }

                            accountantSubject += item.name.split('-')[0]+','
                            accountantCode += item.name.split('-')[1]+','
                        })
                    }
                    // 上传流水和凭证
                    if(this.form.checked && !this.multi){

                        console.log(this.user.tableData[0].name)

                        this._ajax('userAccounts/addFlowingWaterCertificate',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,

                            ...this.form,
                            parentId:this.parentId,

                            accountantSubject,
                            accountantCode,
                            totalCreditMoney,
                            totalDebitMoney,
                            certificateAbstract,

                            certificateNumber:this.form.search,
                            time:this.form.accountsDate,


                            type1:0
                        }, msg => {
                            this._message(1,"保存流水和凭证成功")
                            if(type){
                                this.reload()
                            }
                            if(!type){
                                this.$router.push({path: "/home"})
                            }
                        })
                    }
                    // 都上传了(不是点的现有发票)
                    if(this.form.checked && this.multi == 'shangchuan'){
                        this._ajax('userAccounts/addFlowingWaterInvoiceCertificate',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,

                            ...this.form,
                            parentId:this.parentId,

                            accountantSubject,
                            accountantCode,
                            totalCreditMoney,
                            totalDebitMoney,
                            certificateAbstract,

                            certificateNumber:this.form.search,
                            time:this.form.accountsDate,


                            type1:0,
                            ...JSON.parse(sessionStorage.getItem("fapiao")),
                        }, msg => {
                            this._message(1,"保存流水凭证发票成功")
                            if(type){
                                this.reload()
                            }
                            if(!type){
                                this.$router.push({path: "/home"})
                            }
                            this.clear()

                        })
                    }
                    // 都上传了(点的现有发票)
                    if(this.form.checked && this.multi != 'shangchuan'&& this.multi){
                        this._ajax('userAccounts/addFlowingWaterInvoiceCertificate',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,

                            ...this.form,
                            parentId:this.parentId,

                            accountantSubject,
                            accountantCode,
                            totalCreditMoney,
                            totalDebitMoney,
                            certificateAbstract,
                            certificateNumber:this.form.search,


                            type1:3,
                            invoiceId:sessionStorage.getItem("fapiao"),

                        }, msg => {
                            this._message(1,"保存流水凭证匹配发票成功")
                            this.clear()
                            if(type){
                                this.reload()
                            }
                            if(!type){
                                this.$router.push({path: "/home"})
                            }

                        })
                    }


                }).catch(function() {
                    _self._message(2,"请将信息填写完整")
                    console.log("err");
                });
            },
            // 编辑的保存
            submitForm1(formName) {
                // 有第二个分类的必选第二分类
                if(this.two.length != 0 && this.form.classify == ""){
                    this._message(2,"请选择二级分类")
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this._ajax('userAccounts/updateFlowingWater',{
                            uuid:this.uuid,
                            workAccountId:this.accountId,
                            accountingId:this.$route.query.accountingId,
                            ...this.form,
                            parentId:this.parentId

                            // time:new Date().getFullYear() + '-' + (Array(2).join(0) + (Number(new Date().getMonth())+1)).slice(-2),
                        }, msg => {
                            this._message(1,"保存成功")
                            this.$router.push('/home/zhangmian/liushui')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 清除type1和fapiao
            clear(){
                sessionStorage.removeItem("type1")
                sessionStorage.removeItem("fapiao")
            },
            jie_change(e){
                let index = this.user.tableData.findIndex(item=>{
                    return item.index == e.index
                })
                if(e.jie != ''){
                    this.user.tableData[index].dai_show = true
                }else{
                    this.user.tableData[index].dai_show = false
                    this.user.tableData[index].jie_show = false
                }
            },
            dai_change(e){
                let index = this.user.tableData.findIndex(item=>{
                    return item.index == e.index
                })
                if(e.dai != ''){
                    this.user.tableData[index].jie_show = true
                }else{
                    this.user.tableData[index].dai_show = false
                    this.user.tableData[index].jie_show = false
                }
            },
            // 从现有发票选择
            congxianyoupiaojuxuanze(){
                this.list_bind()
            },
            list_bind(){
                this._ajax('userAccounts/selectNoInvoice3',{
                    uuid:this.uuid,
                    workAccountId:this.accountId,
                    page:this.page,
                    pageSize:this.pageSize
                }, msg => {
                    this.tableData1 = msg.PageInfo.list
                    this.total = msg.PageInfo.total

                    this.dialogVisible = true
                    // this._message(1,"从现有票据选择成功")
                })
            },
            handleSizeChange_bind(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize_bind = val
                this.list_bind()
            },
            handleCurrentChange_bind(val) {
                console.log(`当前页: ${val}`);
                this.dangqianye_bind = val
                this.list_bind()
            },
            dialogVisible_ok(){
                if(this.multi == ""){
                    this._message(2,"请选择一个")
                    return
                }

                this.dialogVisible = false
                // sessionStorage.setItem("fapiao",JSON.stringify(this.multi))
                // sessionStorage.setItem("type1","pipei_fapiao")
            },
            dialogVisible_cancel(){
                this.dialogVisible = false
                this.clear()
                this.multi = ""

            },

            // 操作里的增加按钮
            add(){
                this.index+=1
                this.user.tableData.push({name:'',zhaiyao:'',jie:"",dai:"",jie_show:false,dai_show:false,index:this.index})
            },
            // 操作里的删除按钮
            del(index){
                let i = this.user.tableData.findIndex(item=>{
                    return item.index == index
                })
                this.user.tableData.splice(i,1)
            },

            // 选择二级分类后
            change_two(a){
                console.log(a)
                this.form.classify = a.name
                this.form.subjectId = a.id
                if(a.type == 1){
                    this._ajax('userAccounts/selectSubjectsDictionary1',{
                        uuid:this.uuid,
                        accountId:this.accountId,
                        parentId:1601,
                        name:''
                    }, msg => {
                        this.subject = msg
                        // this._message(1,"科目成功")
                    })
                    this.dialogVisible1 = true
                }
            },
            // 选择一级后
            change_one(a){
                this._ajax('userAccounts/selectSubjects2Dictionary',{
                    uuid:this.uuid,
                    accountId:this.accountId,
                    id:a,
                    flag:this.form.direction,
                    name:''
                }, msg => {
                    this.two = msg
                    this.parentId = msg[0].parent_id
                    this.form.subjectId = a.id
                    this.form.classify = ""
                    // this._message(1,"二级分类成功")
                })
            },
            // 选择方向后
            change_fangxiang(a){
                this._ajax('userAccounts/selectSubjectsDictionary',{
                    uuid:this.uuid,
                    accountId:this.accountId,
                    name:'',
                    flag:this.form.direction
                }, msg => {
                    this.oneList = msg
                    this.form.one = ""
                    this.form.classify = ""
                    // this._message(1,"一级分类成功")
                })
            },

            jiahao(){
                this.$router.push({path: "/home/gongyingshangkehu/add_set",query:{type:"add"}})
            },
            goBack(){
                this.$router.push({path: "/home/zhangmian/liushui"})
            }
        }
    }
</script>

<style>
    .el-table .lan {
        background: rgba(68,160,255,0.05);
    }
    .has-gutter{
        background: red!important;
    }

</style>