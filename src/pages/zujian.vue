<template>
    <div>
        <div class="syd_ba19main syd_mtd40">
            <div class="syd_newMain">
                <!-- 左边目录 -->
                <div class="zj_news_directory">

                    <div class="zj_news_box">

                        <div class="zj_new_title">新闻中心</div>

                        <ul class="zj_new_catalog">

                            <li style="width: 266px;" v-for="(item,index) in super_list" :key="index">
                                <router-link :to="{path:'/home/baobiao/xianjinliuliangbiao/'+index}" :class=" index == num-1?'zj_activeYellow':''">
                                    <span>{{item}}</span>
                                </router-link>

                            </li>

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /xwzxhydt/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>会议动态</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /2019ldhj/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>重要会见</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /mtzxmtzz/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>媒体报道</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /mtzxzpj/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>图片资料</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /mtzxspzl/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>视频资料</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /xzzx/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>下载中心</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /mthzhb/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>媒体合作伙伴</span>-->
                                <!--</a>-->

                            <!--</li>-->

                            <!--<li style="width: 266px;">-->
                                <!--<a href="  /boaogd/index.jhtml&#10;              " class=" ">-->
                                    <!--<span>博鳌观点</span>-->
                                <!--</a>-->

                            <!--</li>-->


                            <div class="clear"></div>
                        </ul>
                    </div>
                    <div class="syd_ld_meeting ">
                        <div class="syd_ldMeet_title">重要会见</div>
                        <div class="syd_ldMeet_list">

                            <div class="syd_title_img" v-for="(item,index) in de_list" :key="index">
                                <a href="/2019ldhj/46671.jhtml" target="_blank" class="syd_titIcon"><img :src="item.img" alt=""></a>
                                <a href="/2019ldhj/46671.jhtml" target="_blank" class="syd_titleBt">{{item.content}}</a>
                            </div>
                            <!--<div class="syd_title_img">-->
                                <!--<a href="/2019ldhj/46651.jhtml" target="_blank" class="syd_titIcon"><img src="http://www.boaoforum.org/u/cms/www/201906/27100536a91g.jpg" alt=""></a>-->
                                <!--<a href="/2019ldhj/46651.jhtml" target="_blank" class="syd_titleBt">李保东秘书长会见美国科恩公司高级顾...</a>-->
                            <!--</div>-->
                            <!--<div class="syd_title_img">-->
                                <!--<a href="/2019ldhj/46576.jhtml" target="_blank" class="syd_titIcon"><img src="http://www.boaoforum.org/u/cms/www/201906/11172421rv73.jpg" alt=""></a>-->
                                <!--<a href="/2019ldhj/46576.jhtml" target="_blank" class="syd_titleBt">李保东秘书长会见全球免疫联盟首席执...</a>-->
                            <!--</div>-->
                            <!--<div class="syd_title_img">-->
                                <!--<a href="/2019ldhj/46577.jhtml" target="_blank" class="syd_titIcon"><img src="http://www.boaoforum.org/u/cms/www/201906/19111340gcf8.jpg" alt=""></a>-->
                                <!--<a href="/2019ldhj/46577.jhtml" target="_blank" class="syd_titleBt">周小川副理事长会见爱沙尼亚央行行长...</a>-->
                            <!--</div>-->
                            <!--<div class="syd_title_img">-->
                                <!--<a href="/2019ldhj/46532.jhtml" target="_blank" class="syd_titIcon"><img src="http://www.boaoforum.org/u/cms/www/201906/07220102p98u.jpg" alt=""></a>-->
                                <!--<a href="/2019ldhj/46532.jhtml" target="_blank" class="syd_titleBt">周小川副理事长会见祖布科夫理事</a>-->
                            <!--</div>-->
                        </div>
                    </div>

                </div>
                <!-- End左边目录 -->

                <!-- 右边列表 -->
                <div class="syd_news_list" style="">
                    <!-- 位置 -->
                    <div class="syd_right_title">
                        <p class="syd_you_wz">
                            <b>您当前的位置：</b>
                            <a href="/">首页</a> &gt;&gt; <a href="/mtzx/index.jhtml" target="_blank">新闻中心</a> &gt;&gt; <a href="/newscenterothers/index.jhtml" target="_blank">{{super_list[num-1]}}</a>
                        </p>
                    </div>					<!-- end位置 -->
                    <div class="syd_list_content">
                        <ul class="syd_ulPage">
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46713.jhtml" title="海南建设中国特色自由贸易港课题结题会在京召开" target="_blank">海南建设中国特色自由贸易港课题结题会在京召开</a>
                                    <p>7月4日，由博鳌亚洲论坛会同中国金融学会、海南省委自贸办（深改办）、海南省中改院、三亚学院联合展开的中国（海南）自由贸易港建设研究课题结题会在论坛秘书处召开。课题组邀请来自外交部、发改委、商务部、...
                                        <a href="/newscenterothers/46713.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-07-05</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46555.jhtml" title="中国国家主席习近平致信祝贺博鳌亚洲论坛全球健康论坛大会开幕" target="_blank">中国国家主席习近平致信祝贺博鳌亚洲论坛全球健康论坛大会开幕</a>
                                    <p>6月11日，博鳌亚洲论坛全球健康论坛大会在青岛开幕。中国国家主席习近平向大会致贺信。

                                        习近平强调，人人享有健康是全人类共同愿景，也是共建人类命运共同体的重要组成部分。推进全球卫生事业，是落实2030...
                                        <a href="/newscenterothers/46555.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-11</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46578.jhtml" title="博鳌亚洲论坛全球健康论坛大会在青岛开幕 孙春兰宣读习近平主席贺信并致辞" target="_blank">博鳌亚洲论坛全球健康论坛大会在青岛开幕 孙春兰宣读习近平主席贺信并致辞</a>
                                    <p>新华社青岛6月11日电 博鳌亚洲论坛全球健康论坛大会11日在山东青岛开幕。中共中央政治局委员、国务院副总理孙春兰宣读习近平主席贺信并致辞。

                                        孙春兰指出，习近平主席的贺信，深刻阐释了人人享有健康在全球...
                                        <a href="/newscenterothers/46578.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-11</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46758.jhtml" title="博鳌亚洲论坛举办会员俱乐部活动： 2019年全球及中国经济半年谈" target="_blank">博鳌亚洲论坛举办会员俱乐部活动： 2019年全球及中国经济半年谈</a>
                                    <p>2019年过半，全球经济形势如何？中国经济形势又有哪些值得关注的重要动向？针对这些问题，2019年7月5日，博鳌亚洲论坛秘书处举办了2019年第二次会员俱乐部活动：“2019年全球及中国经济半年谈”，就...
                                        <a href="/newscenterothers/46758.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-07-08</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46564.jhtml" title="博鳌亚洲论坛和红十字会与红新月会国际联合会签署合作谅解备忘录" target="_blank">博鳌亚洲论坛和红十字会与红新月会国际联合会签署合作谅解备忘录</a>
                                    <p>6月11日，在青岛举行的博鳌亚洲论坛全球健康论坛大会期间，博鳌亚洲论坛秘书长李保东和红十字会与红新月会国际联合会秘书长哈吉·阿西签署合作谅解备忘录。双方将发挥各自优势，推动全民健康覆盖，促进...
                                        <a href="/newscenterothers/46564.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-11</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46574.jhtml" title="李保东：健康就是生产力" target="_blank">李保东：健康就是生产力</a>
                                    <p>6月11日，博鳌亚洲论坛全球健康论坛大会在山东省青岛市中铁博览城开幕。博鳌亚洲论坛秘书长李保东主持开幕式并致辞。

                                        李保东表示，全球健康论坛是博鳌亚洲论坛新搭建的一个高端对话与合作平台。这个论坛从...
                                        <a href="/newscenterothers/46574.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-11</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46552.jhtml" title="李保东秘书长出席博鳌亚洲论坛全球健康博览会开幕式" target="_blank">李保东秘书长出席博鳌亚洲论坛全球健康博览会开幕式</a>
                                    <p>6月10日，李保东秘书长出席博鳌亚洲论坛全球健康论坛大会博览会开幕式。李表示，发起成立全球健康论坛并举办此次大会，旨在搭建一个在全球具有广泛代表性和权威性的政商学结合、高端对话与务实合作的综合性平...
                                        <a href="/newscenterothers/46552.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-10</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="http://news.qingdaonews.com/qingdao/2019-06/10/content_20398184.htm" title="全球健康论坛大会配套展会今天启动 两大场馆开放" target="_blank">全球健康论坛大会配套展会今天启动 两大场馆开放</a>
                                    <p>作为博鳌亚洲论坛全球健康论坛大会的配套展会，6月10日，全球健康博览会开幕，为期三天（6月10日至6月12日）。博览会的开幕标志着博鳌亚洲论坛全球健康大会正式进入青岛时间。
                                        <a href="http://news.qingdaonews.com/qingdao/2019-06/10/content_20398184.htm" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-10</span>
                                </div>
                            </li>
                            <li>
                                <div class="syd_synopsis">
                                    <a href="/newscenterothers/46534.jhtml" title="周小川：加强中俄金融合作为两国经贸和投资合作提供支持" target="_blank">周小川：加强中俄金融合作为两国经贸和投资合作提供支持</a>
                                    <p>周小川副理事长6月7日出席了第二十三届圣彼得堡论坛“中俄商务对话”并做演讲。周副理事长表示，今年是中俄建交70周年，6月5日两国元首在莫斯科签署了“关于发展新时代全面战略协作伙伴关系&amp;rd...
                                        <a href="/newscenterothers/46534.jhtml" target="_blank">[详情]</a>
                                    </p>
                                    <span>2019-06-08</span>
                                </div>
                            </li>
                        </ul>
                        <!--<router-view></router-view>-->
                    </div>

                </div>
            </div><div class="syd_clear"></div>
        </div>
        <p class="cy_clear"></p>

    </div>
</template>

<script>
    export default {
        name: "zujian",
        props:['super_list',"num",'de_list'],
        data(){
            return{
            }
        },
        watch:{

        }
    }
</script>

<style scoped>

    .syd_mtd40 {
        margin-top: 40px;
    }
    .syd_ba19main {
        width: 1200px;
        margin: 0 auto;
    }
    * {z-index:0;}
    .na, .cy_headline a b, .cy_leadermeeting, .cy_meetings-text a b, .cy_hotspot .cy_xc, .cy_flinks, .cy_flinks .cy_xc, .cy_pro-list li em, .cy_event-list {z-index:1;}
    * {word-wrap:break-word; outline:none;font-family:"微软雅黑","黑体";}
    body {margin:0 auto; padding:0; font-family:arial; font-size:12px; color:#333333;height:100%;width:100%;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; text-size-adjust: 100%;}


    .zj_news_directory {
        width: 300px;
        float: left;
    }
    .zj_new_title {
        height: 42px;
        line-height: 42px;
        background: #2579c9;
        text-align: center;
        font-size: 20px;
        color: #ffffff;
    }
    .zj_icon_member {
        display: none;
    }
    .zj_new_catalog {
        border: 1px solid #dde5ee;
        border-top: none;
        padding: 16px;
        background: #fcfdff;
    }
    .zj_new_catalog>li>a{line-height:30px;display:inline-block;*zoom:1}
    .zj_img_rotate{ vertical-align:middle}
    .zj_new_catalog li>ul li a.zj_active1{color:#0f4979; background:url(http://www.boaoforum.org/u/cms/www/201906/11172421rv73.jpg) no-repeat left center; font-weight:bold}
    .zj_new_catalog>li {

        line-height: 32px;
        text-align: center;
        margin: 10px 0;
    }
    .zj_new_catalog>li>a span{
        color:#014073;
        font-family:"微软雅黑","黑体";
        display: block;
        width: 240px;

        float: left;


    }
    .zj_activeYellow span{font-weight:bold}

    .zj_new_catalog li>ul{/* background: #e9edf6; */display:none}
    .zj_new_catalog li>ul li {font-size:14px;width:150px ;padding-left:105px; text-align:left; margin:10px 0 }
    .zj_new_catalog li>ul li a { background:url(http://www.boaoforum.org/u/cms/www/201906/11172421rv73.jpg) no-repeat left center;padding-left:20px}
    .zj_new_catalog>li>a {
        display: block;
        font-size: 16px;
        color: #2f629b;
        overflow:hidden;
        cursor: pointer;
    }
    .zj_new_catalog li >ul>a {
        display: block;
        font-size: 14px;
        color: #2f629b;

    }
    /*选中的条*/
    .zj_new_catalog>li>a.zj_activeYellow{font-weight:bold     ;
        background:#e9edf6;

    }
    .zj_active span{display:block;  float:left ;  }
    .zj_active .zj_img_rotate{display:block;width:4px ;float:left ;margin-top:10px} /**/






    .syd_ld_meeting {
        margin-top: 30px;
        border: 1px solid #e3e3e6;
    }
    .syd_ldMeet_title {
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: #f6f6f8;
        font-size: 20px;



        color: #1f3266;
        font-weight: 600;
        border-bottom: 1px solid #e3e3e6;
    }
    .syd_ldMeet_list {
        padding: 22px 18px;
    }
    .syd_title_img {
        height: 64px;
        margin-bottom:5px
    }
    .syd_titIcon {
        width: 96px;
        height: 64px;
        display: block;
        float: left;
        margin-right: 12px;
    }
    a, a * {transition:color 300ms ease 0s;}
    a{text-decoration: none;color: #333}
    h1,h2,h3,h4,h5,h6,dd,dt,ul,ol,li,span,p,dl,a,th,td,blockquote,form,fieldse {margin:0;padding:0;list-style:none;}
    .syd_titIcon img{width:100%;height:100%}
    .syd_titleBt {
        display: block;
        padding-top: 6px;
        font-size: 12px;
        color: #333333;
        line-height: 20px;
        max-height: 59px;
        overflow: hidden;
    }
    /*右边*/
    .syd_news_list {
        width: 859px;
        float: left;
        margin-left: 38px;
        border: 1px solid #e3e3e6;
        margin-bottom: 10px;
    }
    .syd_right_title {
        height: 40px;
        line-height: 40px;
        background: #fbfdff;
        border-bottom: 1px solid #e3e3e6;
        padding: 0 23px;
    }
    .syd_you_wz {
        background: url("../assets/syd_icon_you_list.png") no-repeat left center;
        font-size: 12px;
        color: #333333;
        padding-left: 28px;
    }
    .syd_list_content {
        padding: 0 60px;
    }
    .syd_ulPage li {
        margin: 5px 0 10px;
        padding-bottom: 2px;
        border-bottom: 1px dotted #b2b2b2;
    }
    .syd_synopsis {
        background: url(../assets/syd_icon_you_ulli.png) no-repeat left 13px;
        background-size: 6px;
        padding-left: 18px;
        margin: 19px 0 25px;
    }
    .syd_synopsis > a {
        display: block;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .syd_synopsis p {
        font-size: 14px;
        color: #4c4c4c;
        line-height: 24px;
        margin: 12px 0 19px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .syd_synopsis p a {
        font-size: 12px;
        color: #014075;
        display:inline-block
    }
    .syd_synopsis span {
        font-size: 14px;
        color: #666;
    }
    .syd_turningPage {
        margin: 30px 0 46px;
        text-align: center;
    }
    .syd_turningPage a {
        padding: 2px 6px;
        border: 1px solid #ddd;
    }
    .syd_clear {
        clear: both;
    }
    .cy_clear {clear:both;}


</style>