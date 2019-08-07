import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
    routes: [
        {   // 登录页面
            path: '/advertisement',
            name: '',
            component: resolve => require(['@/pages/other_server/index'], resolve),
        },
        {   // 登录页面
            path: '/zujian',
            name: '',
            component: resolve => require(['@/pages/zujian'], resolve),
        },
        {   // 登录页面
            path: '/',
            name: '',
            component: resolve => require(['@/pages/login_xiangguan/scanning_login'], resolve),
        },
        {   // 录入公司信息
            path: '/entry_company_message',
            component: resolve => require(['@/pages/login_xiangguan/entry_company_message'], resolve),
        },
        {   // 密码登录
            path: '/password_login',
            name:'',
            component: resolve => require(['@/pages/login_xiangguan/password_login'], resolve),
        },
        {   // 忘记密码
            path: '/forget_password',
            component: resolve => require(['@/pages/login_xiangguan/forget_password'], resolve),
        },
        {   // 扫描成功
            path: '/scanning_success',
            component: resolve => require(['@/pages/login_xiangguan/scanning_success'], resolve),
        },
        {   // 绑定手机
            path: '/bind_phone',
            component: resolve => require(['@/pages/login_xiangguan/bind_phone'], resolve),
        },
        {   // 新手引导第一步
            path: '/one',
            component: resolve => require(['@/pages/xinshouzhidao/one'], resolve),
        },
        {   // 帮助中心
            path: '/help',
            component: resolve => require(['@/pages/help/help'], resolve),
        },
        {   // 主页
            path: '/home',
            name: '',
            component: resolve => require(['@/pages/home'], resolve),
            meta: {
                title: ''
            },
            //项目已通过审核列表
            redirect: {path: '/home/zhangmian/index'},


            children: [
                {   // 欢迎页面
                    path: '/home/zujian',
                    name: '',
                    component: resolve => require(['@/pages/zujian'], resolve),
                },
                {   // 欢迎页面
                    path: '/home/welcome',
                    name: '',
                    component: resolve => require(['@/pages/welcome'], resolve),
                },
                {   //报表-现金流量表
                    path: '/home/baobiao/xianjinliuliangbiao',
                    name: '',
                    component: resolve => require(['@/pages/baobiao/xianjinliuliangbiao'], resolve),

                    children:[
                        {   // 欢迎页面
                            path: '/home/baobiao/xianjinliuliangbiao/one',
                            name: '',
                            component: resolve => require(['@/pages/one'], resolve),
                        },
                        {   // 欢迎页面
                            path: '/home/baobiao/xianjinliuliangbiao/two',
                            name: '',
                            component: resolve => require(['@/pages/one'], resolve),
                        }
                    ]
                },
                {   //报表-利润表
                    path: '/home/baobiao/lirunbiao',
                    name: '',
                    component: resolve => require(['@/pages/baobiao/lirunbiao'], resolve),
                    meta: {
                        title: '报表/利润表'
                    },
                },
                {   //报表-资产负债表
                    path: '/home/baobiao/zichanfuzhaibiao',
                    name: '',
                    component: resolve => require(['@/pages/baobiao/zichanfuzhaibiao'], resolve),
                },
                {   //账簿-科目余额表
                    path: '/home/zhangbu/kemuyuebiao',
                    name: '',
                    component: resolve => require(['@/pages/zhangbu/kemuyuebiao'], resolve),
                },
                {   //账簿-现金日记账
                    path: '/home/zhangbu/xianjinrijizhang',
                    name: '',
                    component: resolve => require(['@/pages/zhangbu/xianjinrijizhang'], resolve),
                },
                {   //账簿-银行日记账
                    path: '/home/zhangbu/yinhangrijizhang',
                    name: '',
                    component: resolve => require(['@/pages/zhangbu/yinhangrijizhang'], resolve),
                },
                {   //账簿-总账
                    path: '/home/zhangbu/zongzhang',
                    name: '',
                    component: resolve => require(['@/pages/zhangbu/zongzhang'], resolve),
                },
                {   //账簿-明细账
                    path: '/home/zhangbu/mingxizhang',
                    name: '',
                    component: resolve => require(['@/pages/zhangbu/mingxizhang'], resolve),
                },
                {   //五险一金管理-五险一金管理
                    path: '/home/wuxianyijin/wuxianyijin',
                    name: '',
                    component: resolve => require(['@/pages/wuxianyijin/wuxianyijin'], resolve),
                },
                {   //五险一金管理-人员详情
                    path: '/home/wuxianyijin/detail',
                    name: '',
                    component: resolve => require(['@/pages/wuxianyijin/detail'], resolve),
                },
                {   //五险一金管理-五险一金设置
                    path: '/home/wuxianyijin/wuxianyijin_set',
                    name: '',
                    component: resolve => require(['@/pages/wuxianyijin/wuxianyijin_set'], resolve),
                },
                {   //五险一金管理-修改和添加员工
                    path: '/home/wuxianyijin/add_set_yuangong',
                    name: '',
                    component: resolve => require(['@/pages/wuxianyijin/add_set_yuangong'], resolve),
                },
                {   //供应商客户管理/客户管理
                    path: '/home/gongyingshangkehu/gongyingshang',
                    name: '',
                    component: resolve => require(['@/pages/gongyingshangkehu/gongyingshang'], resolve),
                },
                {   //供应商客户管理-修改业务伙伴
                    path: '/home/gongyingshangkehu/add_set',
                    name: '',
                    component: resolve => require(['@/pages/gongyingshangkehu/add_set'], resolve),
                },
                {   //凭证管理-凭证管理
                    path: '/home/pingzhengguanli/pingzhengguanli',
                    name: '',
                    component: resolve => require(['@/pages/pingzhengguanli/pingzhengguanli'], resolve),
                },
                {   //凭证管理-新增凭证
                    path: '/home/pingzhengguanli/add_pingzheng',
                    name: '',
                    component: resolve => require(['@/pages/pingzhengguanli/add_pingzheng'], resolve),
                },
                {   //凭证管理-编辑凭证
                    path: '/home/pingzhengguanli/editor_pingzheng',
                    name: '',
                    component: resolve => require(['@/pages/pingzhengguanli/editor_pingzheng'], resolve),
                },
                {   //凭证管理-凭证详情
                    path: '/home/pingzhengguanli/pingzhengxiangqing',
                    name: '',
                    component: resolve => require(['@/pages/pingzhengguanli/pingzhengxiangqing'], resolve),
                },
                {   //凭证管理-新增发票
                    path: '/home/pingzhengguanli/xinzengfapiao',
                    name: '',
                    component: resolve => require(['@/pages/pingzhengguanli/xinzengfapiao'], resolve),
                },
                {   //凭证管理-查看发票
                    path: '/home/pingzhengguanli/look_fapiao',
                    name: '',
                    component: resolve => require(['@/pages/pingzhengguanli/look_fapiao'], resolve),
                },
                {   //发票管理-发票管理
                    path: '/home/fapiao/fapiaoguanli',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/fapiaoguanli'], resolve),
                },
                {   //凭证管理-修改发票
                    path: '/home/fapiao/fapiaoguanli_xiugai',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/fapiaoguanli_xiugai'], resolve),
                },
                {   //发票管理-添加发票
                    path: '/home/fapiao/tianjiafapiao',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/tianjiafapiao'], resolve),
                },
                {   //发票管理-生成凭证和生成凭证和流水
                    path: '/home/fapiao/tianjiapingzheng',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/tianjiapingzheng'], resolve),
                },
                {   //发票管理-匹配至现有凭证
                    path: '/home/fapiao/pipeixianyoupingzheng',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/pipeixianyoupingzheng'], resolve),
                },
                {   //发票管理-匹配至现有流水
                    path: '/home/fapiao/pipeixianyouliushui',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/pipeixianyouliushui'], resolve),
                },
                {   //发票管理-匹配至现有发票
                    path: '/home/fapiao/pipeixianyoufapiao',
                    name: '',
                    component: resolve => require(['@/pages/fapiao/pipeixianyoufapiao'], resolve),
                },

                {   //账面
                    path: '/home/zhangmian/index',
                    name: '',
                    meta: {
                        title: '账面'
                    },
                    component: resolve => require(['@/pages/zhangmian/index'], resolve),
                },
                {   //账面
                    path: '/home/zhangmian/liushui',
                    name: '',
                    component: resolve => require(['@/pages/zhangmian/liushui'], resolve),
                },

                {   //期末结转-第一步
                    path: '/home/qimojiezhuan/one',
                    name: '',
                    component: resolve => require(['@/pages/qimojiezhuan/one'], resolve),
                },
                {   //期末结转-第二步
                    path: '/home/qimojiezhuan/two',
                    name: '',
                    component: resolve => require(['@/pages/qimojiezhuan/two'], resolve),
                },
                {   //期末结转-反结账
                    path: '/home/qimojiezhuan/fanjiezhang',
                    name: '',
                    component: resolve => require(['@/pages/qimojiezhuan/fanjiezhang'], resolve),
                },
                {   //期末结转-固定资产管理
                    path: '/home/qimojiezhuan/fixed_assets_management',
                    name: '',
                    component: resolve => require(['@/pages/qimojiezhuan/fixed_assets_management'], resolve),
                },
                {   //期末结转-固定资产管理的编辑
                    path: '/home/qimojiezhuan/fixed_assets_management_editor',
                name: '',
                    component: resolve => require(['@/pages/qimojiezhuan/fixed_assets_management_editor'], resolve),
                },
                {   //期末结转-生成凭证
                    path: '/home/qimojiezhuan/shengchengpingzheng',
                    name: '',
                    component: resolve => require(['@/pages/qimojiezhuan/shengchengpingzheng'], resolve),
                },
                {   //账面-记账
                    path: '/home/jizhang/index',
                    name: '',
                    component: resolve => require(['@/pages/jizhang/index'], resolve),
                },
                {   //账面-添加发票
                    path: '/home/jizhang/addfapiao',
                    name: '',
                    component: resolve => require(['@/pages/jizhang/addfapiao'], resolve),
                },
                {   //设置-设置
                    path: '/home/setUp/setUp',
                    name: '',
                    component: resolve => require(['@/pages/setUp/setUp'], resolve),
                },
                {   //账套-基本信息管理
                    path: '/home/zhangtao/base_message_manage',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/base_message_manage'], resolve),
                },
                {   //账套-新建账套
                    path: '/home/zhangtao/add_zhangtao',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/add_zhangtao'], resolve),
                },
                {   //账套-期初设置
                    path: '/home/zhangtao/qichushezhi',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/qichushezhi'], resolve),
                },
                {   //账套-账户设置
                    path: '/home/zhangtao/zhanghushezhi',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/zhanghushezhi'], resolve),
                },
                {   //账套-账户设置_新增和编辑
                    path: '/home/zhangtao/zhanghushezhi_add_set',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/zhanghushezhi_add_set'], resolve),
                },
                {   //账套-科目设置
                    path: '/home/zhangtao/kemushezhi',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/kemushezhi'], resolve),
                },
                {   //账套-科目设置-新增
                    path: '/home/zhangtao/kemushezhi_create_account',
                    name: '',
                    component: resolve => require(['@/pages/zhangtao/kemushezhi_create_account'], resolve),
                },
                {   //账套-科目设置-新增
                    path: '/home/port/index',
                    name: '',
                    component: resolve => require(['@/pages/port/index'], resolve),
                },



            ]
        },
    ]
})
router.beforeEach((to,from,next)=>{
    if (to.path == "/entry_company_message" ||to.path == "/password_login" || to.path == "/" || to.path == "/forget_password" || to.path == "/bind_phone") {
        next()
    }else{
        if (localStorage.getItem('user')) {
            next()
        }else{
            next()
            setTimeout(()=>{
                // alert('登陆过期')
                next({path:'/password_login'})
            },2000)
        }
    }
    // if (to.path != "/password_login") {
    //     if (localStorage.getItem('user')) {
    //         next()
    //     }else{
    //         next()
    //         if(to.path == "/" || to.path == "/forget_password"){
    //
    //         }else{
    //             setTimeout(()=>{
    //                 alert('登陆过期')
    //                 next({path:'/password_login'})
    //
    //             },2000)
    //         }
    //
    //     }
    // }else{
    //     next()
    // }
})
export default router
