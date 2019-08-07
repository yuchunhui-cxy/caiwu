<template>
    <div style="background: #EEE;height:100%">
        <el-button type="info" style="float: right;margin-top: 2vh;margin-right: 1vw" @click="$router.push({path:'/home'})">返回财税管家</el-button>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width: 75%;height: 90%">
            <div style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: #FFF;box-shadow:1px 1px 10px #FFF;width: 100%;overflow-y: auto;">
                <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                    <el-tab-pane label="常见问题" name="first">
                        <div style="display: flex;justify-content: space-between;">
                            <div style="flex: 7;padding: 0 2vw">
                                <div class="tit">
                                    1.  基本问题

                                </div>
                                <div class="title">
                                    1 数界财税管家是免费的吗？
                                </div>
                                <div class="content">
                                    数界财税管家的基本功能是完全免费的，一经注册可以直接使用，不会出现使用一段时间时间后收费的情况。当您在使用过程中，有难以解决的问题时，可以联系我们的财务助手为您提供服务。
                                </div>
                                <div class="title" style="margin-top: 2vh">
                                    2 数界财税管家能安全保存数据吗？
                                </div>
                                <div class="content">
                                    数界财税管家采用SSL加密及阿里云服务器，并且采用严格的安全策略，自动保存数据，并通过云端备份存储，十分安全。用户可以随时将凭证进行备份导出，下载到本地归档。
                                </div>
                                <div class="title" style="margin-top: 2vh">
                                    3 数界财税管家对账套及用户有限制吗？
                                </div>
                                <div class="content">
                                    数界财税管家对账套及用户没有任何限制，即一个用户可以注册使用多个账套，一个账套可以由多个用户使用。
                                </div>
                                <div class="tit">
                                    2.	操作环境问题
                                </div>
                                <div class="title">
                                    1 数界财税管家支持怎么样的电脑环境？
                                </div>
                                <div class="content">
                                    数界财税管家记账功能支持Windows XP、Windows 7、Windows 8、Windows 10及MAC等操作系统。
                                </div>
                                <div class="title">
                                    2数界财税管家支持怎么样的浏览器？
                                </div>
                                <div class="content">
                                    数界财税管家支持多种浏览器，推荐使用的有谷歌浏览器、360浏览器、搜狗浏览器、IE8、IE9、IE10、IE11等浏览器，暂时不支持IE6和IE7浏览器。
                                </div>
                                <div class="tit">
                                    3.	科目问题
                                </div>
                                <div class="title">
                                    1 如何添加科目？/如何编辑系统默认已有的科目？/如何删除科目？
                                </div>
                                <div class="content">
                                    ①若用户选择的会计准则是小企业会计准则，那么系统默认的科目是按照2013年版 《小企业会计准则》设置，系统默认的科目包含了必需的所有一级科目，为了使软件报表取数准确，不允许小企业会计准则的账套增加一级科目，但可以增加二级科目。系统默认已有的科目不允许编辑、删除，而手工增加的科目是可以修改、删除。
                                </div>
                                <div class="content">
                                    ②系统暂不支持企业会计准则。
                                </div>
                                <div class="content">
                                    ③新增的科目如果已经使用（有期初数据、已经在凭证上使用、有下级科目）不允许删除，其他新增的末级科目可以删除。
                                </div>
                                <div class="title">
                                    2 选择了小企业会计准则，不能添加一级科目，如何录入涉及以前会计制度的旧科目？
                                </div>
                                <div class="content">
                                    有些用户习惯使用以前的会计制度，因此，关于以前会计制度的旧科目，我们提供以下解决方式
                                </div>
                                <div class="content">
                                    预提费用，新会计准则已废除该科目，可用“其他应付款”代替。
                                </div>
                                <div class="content">
                                    待摊费用，新会计准则已废除该科目，可用“预付账款”或“其他应收款”代替。
                                </div>
                                <div class="content">
                                    低值易耗品，可在一级科目“周转材料”下设置二级科目“低值易耗品”，即“周转材料—低值易耗品”。
                                </div>
                                <div class="content">
                                    其他应交款，新会计准则已废除该科目，可用“应交税费”代替。
                                </div>
                                <div class="contnet">
                                    劳务成本，可在一级科目“主营业务成本”或“其他业务成本”下设二级科目“劳务成本”。即“主营业务成本—劳务成本”或“其他业务成本—劳务成本”。
                                </div>
                                <div class="content">
                                    坏账准备，2013年版 《小企业会计准则》是不计提坏账准备的，小企业发生坏账损失时，直接计入营业外支出，同时冲减应收款项。
                                </div>
                                <div class="content">
                                    以前年度损益调整，2013年版《小企业会计准则》取消了该科目，发生相关业务时，直接计入当期损益。分录举例：借：管理费用，贷：利润分配—未分配利润。
                                </div>
                                <div class="tit">
                                    4.	期初问题
                                </div>
                                <div class="title">
                                    1 如何录入科目的期初余额？
                                </div>
                                <div class="content">
                                    期初余额的数据就是上期期末余额的数据。
                                </div>
                                <div class="content">
                                    操作：点击左侧边栏的 “管理”→“账套设置”→“期初设置”。
                                </div>
                                <div class="content">
                                    当新建的账套启用月份是1月时，需要把上年12月的期末余额录入到1月的“期初余额”中；
                                </div>
                                <div class="content">
                                    当新建的账套启用月份不是1月时，需要在“期初”录入“期初余额”、“借方累计”和“贷方累计”，“年初余额”会根据前几项金额自动换算得出。损益类科目的借贷方累计数也需要录入，否则利润表的本年累计数会出错，影响利润表的准确性。其他科目也需要录入累计数，否则影响资产负债表的年初余额，影响资产负债表的准确性。
                                </div>
                                <div class="content">
                                    若要增加明细科目进行数据录入，需要先在“科目设置”中新增明细科目，再在“期初设置”中进行数据录入。
                                </div>
                                <div class="tit">
                                    5.	凭证问题
                                </div>
                                <div class="title">
                                    1 如何增加凭证？/如何查看和编辑凭证？/如何删除凭证？
                                </div>
                                <div class="content">
                                    操作：点击左侧边栏的 “管理”→“凭证管理”<br>
                                    进入查看凭证的界面后，在筛选框选择对应的项目，就可以查看凭证。<br>
                                    已经结账的期间不允许对凭证进行修改、删除操作，如想修改，需要先反结账才能修改。
                                </div>
                                <div class="tit">
                                    6.	报表问题
                                </div>
                                <div class="title">
                                    1 资产负债表的应收账款、预收账款、应付账款、预付账款、其他应收款、其他应付款是如何取数？
                                </div>
                                <div class="content">
                                    资产负债表是自动勾选“开启重分类”，系统是默认根据重分类的规则取数的：<br>
                                    ① 应收账款项目=应收账款明细科目借方余额+预收账款明细科目借方余额-计提的相应的坏账准备明细科目余额（小企业会计准则不需要计提坏账准备）<br>
                                    ② 预收款项项目=应收账款明细科目贷方余额+预收账款明细科目贷方余额 <br>
                                    ③ 应付账款项目=应付账款明细科目贷方余额+预付账款明细科目贷方余额 <br>
                                    ④ 预付款项项目=应付账款明细科目借方余额+预付账款明细科目借方余额 <br>
                                    ⑤ 其他应收款项目=其他应收款明细科目借方余额+其他应付款明细科目借方余额-计提的相应的坏账准备明细科目余额（小企业会计准则不需要计提坏账准备） <br>
                                    ⑥ 其他应付款项目=其他应付款明细科目贷方余额+其他应收款明细科目贷方余额

                                </div>
                                <div class="title">
                                    2 利润表的报表项目为什么有时候不等于科目余额表的发生额？
                                </div>
                                <div class="content">
                                    利润表的报表项目是根据各个公式对应科目计算显示最终的净发生额，其中涉及需要抵销的发生额是不显示的，而科目余额表的发生额显示的是科目的全部发生额，所以两者的逻辑是不一样的，以下例子可以说明两者存在差异，凭证1和凭证2中的主营业务成本是需要抵消的，所以主营业务成本的净发生额是100-10=90，而主营业务成本在借方发生额和贷方发生额是视乎凭证的记账规则合计显示的，结转损益后，此时，科目余额表显示的主营业务成本的本期发生额是100，而利润表的营业成本的本期金额是90，这个是正确的。<br>
                                    凭证1，借：主营业务成本 100 贷：库存商品 100 <br>
                                    凭证2，借：库存商品 10 贷：主营业务成本 10 <br>
                                    期末结转损益，将损益类科目的余额结转到“本年利润”中，结转后，损益科目余额为零 <br>
                                    凭证3，借：本年利润 90 贷：主营业务成本 90

                                </div>

                            </div>
                            <div style="flex: 3;padding: 0 1vw">
                                <div style="margin: 1vh 0;" v-for="(item,index) in list" :key="index">
                                    <img src="@/assets/images/one.png" alt="" style="width: 100%">

                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="操作手册" name="second">
                        <div style="display: flex;justify-content: space-between;display:flex;justify-content: center;">
                            <div style="flex: 7;padding: 0 2vw">
                                <div class="title">
                                    1.	开始使用
                                </div>
                                <div class="content">
                                    用户在微信快捷登录进入系统后，首次登录会需要提交第一套账目的信息。
                                    （录入公司信息）<br>
                                    系统会根据您的选择自动为您初始化账目，随后即可开始记账。

                                </div>

                                <div class="title">
                                    2.	创建另一套账
                                </div>
                                <div class="content">
                                    点击管理-账套管理-新建账套，录入信息保存即可。
                                    （新建账套）<br>
                                    在左侧边栏，账套名后单击下拉选即可切换账套。<br>
                                    （左侧边栏下拉选）

                                </div>

                                <div class="title">
                                    3.	期初设置
                                </div>
                                <div class="content">
                                    期初余额的数据就是上期期末余额的数据。<br>
                                    操作：点击左侧边栏的 “管理”→“账套设置”→“期初设置”。 <br>
                                    当新建的账套启用月份是1月时，需要把上年12月的期末余额录入到1月的“期初余额”中；<br>
                                    当新建的账套启用月份不是1月时，需要在“期初”录入“期初余额”、“借方累计”和“贷方累计”，“年初余额”会根据前几项金额自动换算得出。损益类科目的借贷方累计数也需要录入，否则利润表的本年累计数会出错，影响利润表的准确性。其他科目也需要录入累计数，否则影响资产负债表的年初余额，影响资产负债表的准确性。<br>
                                    若要增加明细科目进行数据录入，需要先在“科目设置”中新增明细科目，再在“期初设置”中进行数据录入。
                                </div>
                                <div class="title">
                                    4.	记账
                                </div>
                                <div class="content">
                                    系统提供三种记账方式。<br>
                                    对于非专业财务人士的用户，可以选择从“记录流水”开始记账。系统内置了适用于非专业财务人士的记账方式，只需选择收支方向、交易的分类、交易的方式、金额等，就可生成一张用于报税所用报表的专业会计凭证。
                                    <br>
                                    对于专业财务人士的用户，也可以选择从“记录凭证”开始记账。<br>
                                    对于有大量发票需要快捷录入发票的用户，可以选择从“上传发票”开始记账。将发票照片上传后，填写简单的必要信息后，即可生成一张用于报税所用报表的专业会计凭证。<br>

                                </div>
                                <div class="title">
                                    5.	首页信息
                                </div>
                                <div class="content">
                                    开支占比 <br>
                                    系统按照本月录入的流水提供本月的收支统计图。<br>
                                    财务简报 <br>
                                    系统将主要的财务指标显示在桌面供您查看，<br>
                                    财税提醒 <br>
                                    系统根据大数据，对您的财税情况进行分析和提醒。如需帮助，可联系我们的财务助手为您提供服务。

                                </div>
                                <div class="title">
                                    6.	账套管理
                                </div>
                                <div class="content">
                                    您可以在左侧边栏对账套的详细信息进行管理
                                </div>
                                <div class="title">
                                    7.	账簿查看
                                </div>
                                <div class="content">
                                    您可以在左侧边栏对账套的详细信息进行管理
                                </div>
                                <div class="title">
                                    6.	账套管理
                                </div>
                                <div class="content">
                                    ①	点击左上角显示当期会计期间的筛选框，即可执行查询。
                                    ②	“明细账”中点击右列相应的科目名称，可以快速切换科目的明细账
                                    ③	“科目余额表”中点击相应的科目名称，会跳转到对应的明细账。

                                </div>
                                <div class="title">
                                    6.	账套管理
                                </div>
                                <div class="content">
                                    ①	点击左上角显示当期会计期间的筛选框，即可执行查询。<br>
                                    ②	“明细账”中点击右列相应的科目名称，可以快速切换科目的明细账 <br>
                                    ③	“科目余额表”中点击相应的科目名称，会跳转到对应的明细账。

                                </div>
                                <div class="title">
                                    8.	报表查看
                                </div>
                                <div class="content">
                                    系统提供资产负债表、明细表、现金流量表三张进行生成和查看，可点击左侧边栏进行详细操作。<br>
                                    “资产负债表”不平衡，报表会提示不平标识，点击该标识， “资产负债表”不平衡的原因如下：<br>
                                    a) 期初余额试算不平衡 <br>
                                    b) 本期未结转损益 <br>
                                    “利润表”会被期初录入的“借方累计”和“贷方累计”数据影响。维护期初数据时，需要录入“期初余额”、“借方累计”、“贷方累计”，如果没有录入“借方累计”和“贷方累计”数据，将会影响期末报表的数据准确性，所以用户需要特别注意损益类科目的期初数据。


                                </div>
                                <div class="title">
                                    9.	其他服务
                                </div>
                                <div class="content">
                                    在使用过程中，有任何问题，可联系我们的财务助手为您提供服务。
                                </div>
                            </div>
                            <div style="flex: 3;padding: 0 1vw">
                                <div style="margin: 1vh 0;" v-for="(item,index) in list" :key="index">
                                    <img src="@/assets/images/one.png" alt="" style="width: 100%">
                                </div>
                            </div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="意见反馈" name="third">
                        <div style="padding: 2vh 2vw;">
                            <div class="margin">
                                我们珍视您的每一条反馈
                            </div>
                            <div class="margin">
                                描述精确，管家更易发现问题所在
                            </div>
                            <el-form :inline="false" ref="form" :model="form" style="margin-top: 2vh" class="demo-form-inline" label-width="80px">
                                <el-form-item label="">
                                    <el-input
                                            placeholder="问题描述需大于5小于200字"
                                            type="textarea"
                                            :rows="4"
                                            v-model="form.content">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-upload class="margin" :on-change="change" action="#" :show-file-list="false" :auto-upload="false">
                                        <el-button type="warning">点击上传</el-button>
                                    </el-upload>
                                    <img :src="img" alt="">
                                </el-form-item>
                                <div style="display: flex;">
                                    <div style="width: 300px;">
                                        <el-form-item label="QQ">
                                            <el-input v-model="form.qq" placeholder="审批人"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div style="width: 300px;">
                                        <el-form-item label="手机号">
                                            <el-input v-model="form.phone" placeholder="审批人"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit('form')">提交反馈</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>


            </div>
        </div>

    </div>
</template>

<script>
    import OSS from 'ali-oss'
    export default {
        name: "set-up",
        data() {

            return {
                fileName: [],
                fileArr: [],
                activeName: 'first',
                form: {
                    content:'',
                    qq: '',
                    phone:'',
                },
                rules: {

                },
                list:[1,2,3,4,5],
                img:"",
            };
        },
        methods: {

            handleClick(tab, event) {
                console.log(tab, event);
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let uuid =  JSON.parse(localStorage.getItem('uuid'))
                        this._ajax('weChat/addUserQuestion1',{...this.form,uuid:uuid,photoUrl:this.img}, msg => {
                            this._message(1,"提交成功")
                            this.form = {
                                content:'',
                                qq: '',
                                phone:'',
                            }
                            this.img = ''
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 上传文件
            change (file) {
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
                    _this.img = result.res.requestUrls[0];
                    _this.$message({
                      message: '上传成功',
                      type: 'success'
                    });

                }).catch(function (err) {
                    console.log(err);
                    _this.$message({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });

            }
        }
    }
</script>

<style>
    .el-tabs__nav-wrap
    .el-tabs__nav-scroll
    .el-tabs__nav {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .tit{
        font-size: 35px;
        margin-top: 2vh;
    }
    .title{
        font-size: 24px;
        color: #40454B;
        margin-top: 2vh;
    }
    .content{
        font-size: 12px;
        color: #212542;
    }
    .margin{
        margin: 2vh 0;
    }
</style>